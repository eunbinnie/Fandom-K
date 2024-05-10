import React, { createContext, useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import  { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import 'swiper/css/autoplay';
import "swiper/css";
import "swiper/css/navigation";

import styled from "styled-components";

import getIdols from "@/shared/api/idols";
import IdolCard from "@/shared/ui/IdolCard/IdolCard";
import IdolListCardSkeleton from "@/entities/card/skeletons/IdolListCardSkeleton";

// 이미지
import logoImg from "@/shared/assets/icons/logo.svg";
import myLogo from "@/shared/assets/icons/my_logo.svg";
import leftArrow from "@/shared/assets/icons/left_arrow.svg";
import rightArrow from "@/shared/assets/icons/right_arrow.svg";
import plusIcon from "@/shared/assets/icons/Ic_plus_24px.svg";

const LOCAL_STORAGE_KEY = "interest";

// 관심있는 아이돌 state 초기값 세팅
const getLocalStorage = () => {
	const list = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));
	return list && list.length > 0 ? list : [];
};

// 반응형 체크
const changeDataCount = (innerWidth) => {
	if (innerWidth < 481) {
		return 6;
	} else if (innerWidth < 745) {
		return 8;
	} else if (innerWidth < 1281) {
		return 12;
	} else {
		return 16;
	}
};

export const SelectContext = createContext();

const MyPage = () => {
	//state
	const [swiperRef, setSwiperRef] = useState(null);
	const [swiperIndex, setSwiperIndex] = useState(0);
	const [nextCursor, setNextCursor] = useState(0);
	const [idolPageData, setIdolPageData] = useState([]); // swiper 돌릴 데이터
	const [interestIdols, setInterestIdols] = useState(getLocalStorage()); // 관심있는 아이돌 목록 state
	const [localStorageData, setLocalStorageData] = useState(getLocalStorage()); // localStorage 데이터
	const [isAddingMode, setIsAddingMode] = useState(true); // 추가하기 모드 상태
	const [isLoading, setIsLoading] = useState(true);
	const [dataCount, setDataCount] = useState(
		changeDataCount(window.innerWidth),
	);

	// 보이는 아이템 수 변경하는 함수
	const flattenArray = () => {
		if (idolPageData.length > 0) {
			const result = [];
			const newArr = idolPageData?.reduce((prev, next) => {
				return prev.concat(next.list);
			}, []);
			const page = Math.ceil(newArr.length / dataCount);
			for (let i = 0; i < page; i++) {
				const list = [];
				for (let j = 0; j < dataCount; j++) {
					if (newArr[dataCount * i + j]) {
						list.push(newArr[dataCount * i + j]);
					}
				}
				let nextCursor;
				if (list.length < dataCount) {
					nextCursor = null;
				} else {
					nextCursor = list[list.length - 1].id;
				}
				result.push({ list, nextCursor });
			}
			return result;
		}
	};

	// 관심있는 아이돌 localStorage 업데이트
	const setLocalStorage = (data) => {
		const string = JSON.stringify(data);
		window.localStorage.setItem(LOCAL_STORAGE_KEY, string);
		setLocalStorageData(() => getLocalStorage());
		setIsAddingMode(false); // 추가하기 모드 해제
	};

	// 아이돌 목록에서 체크하면 관심있는 아이돌 state 업데이트
	const handleClickIdolList = (target) => {
		// localStorage에 저장된 데이터
		setIsAddingMode(true);

		setInterestIdols((prev) => {
			if (!prev.some((item) => item.id === target.id)) {
				// target 추가
				return [...prev, target];
			} else if (localStorageData.some((data) => data.id === target.id)) {
				// localStorage에 등록되어있는 target 선택한 경우
				return prev;
			} else {
				// target을 선택했다가 선택해제한 경우
				const deleteList = prev.filter((item) => item.id !== target.id);
				return deleteList;
			}
		});
	};

	// 관심있는 아이돌 삭제 함수
	const deleteIdol = (idol) => {
		const LocalStorageData = getLocalStorage();
		const updateData = LocalStorageData.filter((data) => data.id !== idol.id);
		setInterestIdols(updateData);
		setLocalStorage(updateData);
	};

	// 아이돌 목록 불러오기
	const getIdolList = async () => {
		try {
			const list = await getIdols(dataCount);
			const nextCursor = list.nextCursor;
			const secondList = await getIdols(dataCount, nextCursor);

			setNextCursor(secondList.nextCursor);
			setIdolPageData([list, secondList]);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching idols:", error);
		}
	};

	// 스와이퍼 이전 페이지 불러오기
	const prevPageData = () => {
		setNextCursor(true);

		if (swiperRef) {
			swiperRef.slidePrev();
		}
	};

	// swiper change - api 불러오기, 다음 페이지 이동
	const handleSlideChange = async (swiper) => {
		const currentIndex = swiper.activeIndex;
		const totalSlides = swiper.slides.length;

		try {
			if (currentIndex === totalSlides - 1) {
				const prevCursor = idolPageData[idolPageData.length - 1].nextCursor;

				if (!prevCursor) {
					setNextCursor(null);
				} else {
					const lists = await getIdols(dataCount, prevCursor);

					setNextCursor((prev) => prev);

					setIdolPageData((prev) => {
						return [...prev, lists];
					});
				}
			} else {
				const currentCursor = idolPageData[currentIndex].nextCursor;
				setNextCursor(currentCursor);
			}
		} catch (error) {
			console.error("Error fetching idols:", error);
		}
	};

	useEffect(() => {
		const data = flattenArray();
		let a = JSON.stringify(idolPageData);
		let b = JSON.stringify(data);

		if (data && a.split("").sort().join("") !== b.split("").sort().join("")) {
			setIdolPageData(data);
		}
	}, [idolPageData, dataCount]);

	useEffect(() => {
		getIdolList();
	}, [dataCount]);

	useEffect(() => {
		const event = (e) => {
			const showCount = changeDataCount(e.target.innerWidth);
			setDataCount(showCount);
		};

		window.addEventListener("resize", event);
		return () => {
			window.removeEventListener("resize", event);
		};
	}, []);

	useLayoutEffect(()=>{
		const showCount = changeDataCount(window.innerWidth);
		setDataCount(showCount);
	}, [])

	return (
		<Container>
			<Inner>
				<Header>
					<Box></Box>
					<Box>
						<Logo to="/">
							<CustomImg src={logoImg} alt="FANDOM-K" />
						</Logo>
					</Box>

					<Box right="right">
						<Link href="/MyPage">
							<img src={myLogo} alt="마이페이지" />
						</Link>
					</Box>
				</Header>
				<SelectContext.Provider value={isAddingMode}>
					<Page>
						{/* 관심있는 아이돌 */}
						<section>
							<Title>내가 관심있는 아이돌</Title>
							{localStorageData.length > 0 ? <WideSwiper
								modules={[Autoplay]}
								slidesPerView='auto'
								slidesPerGroup={1}
								spaceBetween={4}
								observer={true}
								observeParents={true}
								observeSlideChildren={true}
								loop={true}
								autoplay={{ delay: 6000 }}

								breakpoints={{
									480: {
										spaceBetween: 24
									}
								}}
							>
								{localStorageData.map((idol) => {
									return (
										<CustomSlide key={idol.id}>
											<IdolCard
												info={idol}
												padding="7.14"
												remove={true}
												deleteIdol={() => deleteIdol(idol)}
											/>
										</CustomSlide>
									);
								})}
							</WideSwiper> : <Text>관심있는 아이돌 목록에 추가해 보세요!</Text>}
						</section>
						<Hr />
						{/* 아이돌 목록 */}
						<section>
							<Title>관심 있는 아이돌을 추가해보세요.</Title>

							<SwiperContainer>
								<Swiper
									slidesPerView={1}
									spaceBetween={22}
									observer={true}
									observeParents={true}
									observeSlideChildren={true}
									onSwiper={(swiper) => {
										setSwiperRef(swiper);
										setSwiperIndex(swiper.activeIndex);
									}}
									onSlideChange={(swiper) => {
										setSwiperIndex(swiper.activeIndex);
										handleSlideChange(swiper);
									}}
									navigation={{
										prevEl: ".swiper-button-prev",
										nextEl: ".swiper-button-next",
									}}
									modules={[Navigation]}
								>
									{idolPageData.length === 0 || isLoading ? (
										<SwiperSlide>
											<IdolListCardSkeleton count={dataCount} />
										</SwiperSlide>
									) : (
										<>
											{idolPageData?.map((slideData, slideIndex) => {
												return (
													<SwiperSlide key={slideIndex}>
														<IdolList>
															{slideData.list.map((idol) => {
																return (
																	<IdolCard
																		key={idol.id}
																		info={idol}
																		padding="6.48"
																		chooseIdol={() => handleClickIdolList(idol)}
																	/>
																);
															})}
														</IdolList>
													</SwiperSlide>
												);
											})}
											{isLoading ?? (
												<SwiperSlide>
													<IdolListCardSkeleton count={dataCount} />
												</SwiperSlide>
											)}
										</>
									)}
								</Swiper>
								{Boolean(swiperIndex) && (
									<LeftArrow
										className="swiper-button-prev"
										onClick={prevPageData}
									>
										<img src={leftArrow} alt="이전" />
									</LeftArrow>
								)}
								{nextCursor && (
									<RightArrow
										className="swiper-button-next"
										onClick={() => swiperRef.slideNext()}
									>
										<img src={rightArrow} alt="다음" />
									</RightArrow>
								)}
							</SwiperContainer>
						</section>

						<Button onClick={() => setLocalStorage(interestIdols)}>
							<Icon>
								<img src={plusIcon} alt="+" />
							</Icon>
							<Span>추가하기</Span>
						</Button>
					</Page>
				</SelectContext.Provider>
			</Inner>
		</Container>
	);
};



//레이아웃
const Container = styled.div`
	color: var(--black1);
	min-height: 100vh;
`;

//inner
const Inner = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 24px;
	box-sizing: content-box;
	background-color: #02000e;
	overflow: hidden;
`;

//헤더
const Header = styled.header`
	position: relative;
	z-index: 1;
	padding: 23px 0;
	display: flex;
	align-items: center;

	@media only screen and (max-width: 480px) {
		padding: 12px 0;
	}
`;

//logo-box
const Box = styled.div`
	flex: 1;
	text-align: ${({ right }) => (right ? right : "center")};

	> a {
		display: inline-block;
	}
`;

const Logo = styled(Link)`
	@media only screen and (max-width: 744px) {
		width: 120px;
	}

	@media only screen and (max-width: 480px) {
		width: 108px;
	}
`;

//마이페이지
const Page = styled.div`
	padding: 75px 0 80px;

	@media only screen and (max-width: 744px) {
		padding: 15px 0 210px;
	}

	@media only screen and (max-width: 480px) {
		padding: 25px 0 40px;
	}
`;

//h1
const Title = styled.h1`
	color: #f6f6f8;
	font-weight: 700;
	font-size: 24px;
	line-height: 1.08;
	margin-bottom: 32px;

	@media only screen and (max-width: 744px) {
		font-size: 20px;
		margin-bottom: 25px;
		line-height: 1.3;
	}

	@media only screen and (max-width: 480px) {
		font-size: 16px;
		margin-bottom: 15px;
		line-height: 1.6;
	}
`;

const CustomImg = styled.img`
	width: 100%;
`;

const Text = styled.p`
	padding: 35px 0 30px;
	font-size: 14px;
	font-weight: 400;
	line-height: 1.2;
	text-align: center;
	color: #fff;
	opacity: 0.6;
	word-break: keep-all;
`;

const WideSwiper = styled(Swiper)`
	@media only screen and (max-width: 480px) {
		width: 100vw;
	}
`;

//hr
const Hr = styled.hr`
	border: 1px solid rgba(255, 255, 255, 0.1);
	margin: 40px 0;

	@media only screen and (max-width: 744px) {
		margin: 32px 0;
	}
`;

//아이돌 목록 슬라이드 영역, 미디어쿼리 _carousel-container
const SwiperContainer = styled.div`
	position: relative;
	width: 100%;

	@media only screen and (max-width: 1370px) {
		display: flex;
	}
`;

const CustomSlide = styled(SwiperSlide)`
	width: 98px;

	@media only screen and (max-width: 480px) {
		padding: 0 14px;
	}
`;

//idol-list ,미디어쿼리 idol-list
const IdolList = styled.div`
	width: 100%;
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	grid-template-columns: repeat(8, 1fr);
	gap: 31px 22px;

	@media only screen and (max-width: 1370px) {
		padding: 0 56px;
	}

	@media only screen and (max-width: 1280px) {
		padding: 0 56px;
		gap: 24px;
		grid-template-columns: repeat(6, 1fr);
	}

	@media only screen and (max-width: 744px) {
		grid-template-columns: repeat(4, 1fr);
	}

	@media only screen and (max-width: 480px) {
		padding: 0;
		gap: 24px 17px;
		grid-template-columns: repeat(3, 1fr);
	}
`;

//arrow
const Arrow = styled.button`
	position: absolute;
	top: 50%;
	z-index: 10;
	min-width: 29px;
	height: 135px;
	border-radius: 4px;
	opacity: 0.8;
	border: 0;
	background-color: var(--black3);
	transform: translateY(-50%);

	@media only screen and (max-width: 480px) {
		display: none;
	}
`;

const LeftArrow = styled(Arrow)`
	left: -61px;
	&::after {
		content: "";
	}
	@media only screen and (max-width: 1370px) {
		left: 0;
	}
`;

const RightArrow = styled(Arrow)`
	right: -61px;
	&::after {
		content: "";
	}
	@media only screen and (max-width: 1370px) {
		right: 0;
	}
`;

//추가하기 버튼
const Button = styled.button`
	max-width: 100%;
	width: 255px;
	padding: 11px 0;
	margin: 40px auto 0;
	border-radius: 24px;
	border: none;
	color: white;
	font-size: 16px;
	font-weight: 700;
	line-height: 1.6;
	display: flex;
	justify-content: center;
	gap: 8px;
	background: linear-gradient(to right, #f77063, #fe5790);
`;

//추가하기 버튼의 +아이콘
const Icon = styled.div`
	width: 24px;
	height: 24px;
`;

//추가하기 버튼의 span
const Span = styled.span`
	font-weight: 700;
`;

export default MyPage;
