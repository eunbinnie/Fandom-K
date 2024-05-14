import React, {
	createContext,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";

import styled from "styled-components";

import { getIdols } from "@/common/api/api";
import Header from "@/common/ui/Header";
import IdolSwiper from "./widgets/IdolSwiper/IdolSwiper";
import InterestIdolList from "./widgets/InterestIdolList/InterestIdolList";

// 이미지
import plusIcon from "@/common/assets/icons/Ic_plus_24px.svg";

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
			setIsLoading(false);

			setNextCursor(secondList.nextCursor);
			setIdolPageData([list, secondList]);
		} catch (error) {
			console.error("Error fetching idols:", error);
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
					setIsLoading(true);
					const lists = await getIdols(dataCount, prevCursor);
					setIsLoading(false);

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

	useLayoutEffect(() => {
		const showCount = changeDataCount(window.innerWidth);
		setDataCount(showCount);
	}, []);

	return (
		<Container>
			<Inner>
				<Header />
				<SelectContext.Provider value={isAddingMode}>
					<Page>
						{/* 관심있는 아이돌 */}
						<section>
							<Title>내가 관심있는 아이돌</Title>
							{localStorageData.length > 0 ? (
								<InterestIdolList
									localStorageData={localStorageData}
									deleteIdol={deleteIdol}
								/>
							) : (
								<Text>관심있는 아이돌 목록에 추가해 보세요!</Text>
							)}
						</section>
						<Hr />
						{/* 아이돌 목록 */}
						<section>
							<Title>관심 있는 아이돌을 추가해보세요.</Title>

							<IdolSwiper
								idolPageData={idolPageData}
								isLoading={isLoading}
								dataCount={dataCount}
								nextCursorProps={{
									nextCursor: nextCursor,
									setNextCursor: setNextCursor,
								}}
								handleSlideChange={handleSlideChange}
								handleClickIdolList={handleClickIdolList}
							/>
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

	@media only screen and (max-width: 480px) {
		overflow: hidden;
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

//hr
const Hr = styled.hr`
	border: 1px solid rgba(255, 255, 255, 0.1);
	margin: 40px 0;

	@media only screen and (max-width: 744px) {
		margin: 32px 0;
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
