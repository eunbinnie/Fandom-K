import React, { useState } from "react";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import IdolCard from "../card/ui/IdolCard";
import IdolListCardSkeleton from "../card/skeletons/IdolListCardSkeleton";
import Arrow from "../Arrow/Arrow";

import leftArrow from "@/common/assets/icons/left_arrow.svg";
import rightArrow from "@/common/assets/icons/right_arrow.svg";

const IdolSwiper = (props) => {
	const {
		idolPageData,
		isLoading,
		dataCount,
		nextCursorProps,
		handleSlideChange,
		handleClickIdolList,
	} = props;

	const { nextCursor, setNextCursor } = nextCursorProps;
	const [swiperRef, setSwiperRef] = useState(null);
	const [swiperIndex, setSwiperIndex] = useState(0);

	// 스와이퍼 이전 페이지 불러오기
	const prevPageData = () => {
		setNextCursor(true);

		if (swiperRef) {
			swiperRef.slidePrev();
		}
	};

	return (
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
				{idolPageData.length === 0 ? (
					isLoading ? (
						<SwiperSlide>
							<IdolListCardSkeleton count={dataCount} />
						</SwiperSlide>
					) : null
				) : (
					idolPageData?.map((slideData, slideIndex) => (
						<SwiperSlide key={slideIndex}>
							{isLoading ? (
								<IdolListCardSkeleton count={dataCount} />
							) : (
								<IdolList>
									{slideData.list.map((idol) => (
										<IdolCard
											key={idol.id}
											info={idol}
											padding="6.48"
											chooseIdol={() => handleClickIdolList(idol)}
										/>
									))}
								</IdolList>
							)}
						</SwiperSlide>
					))
				)}
			</Swiper>

			{Boolean(swiperIndex) && (
				<Arrow
					className="swiper-button-prev"
					onClick={prevPageData}
					imgSrc={leftArrow}
					position="left"
					alt="이전"
				/>
			)}
			{nextCursor && (
				<Arrow
					className="swiper-button-next"
					onClick={() => swiperRef.slideNext()}
					imgSrc={rightArrow}
					position="right"
					alt="다음"
				/>
			)}
		</SwiperContainer>
	);
};

const SwiperContainer = styled.div`
	position: relative;
	width: 100%;

	@media only screen and (max-width: 1370px) {
		display: flex;
	}
`;

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

export default IdolSwiper;
