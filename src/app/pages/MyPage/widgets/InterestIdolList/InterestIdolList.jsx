import React from "react";
import styled from "styled-components";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import "swiper/css";

import IdolCard from "../card/ui/IdolCard";

const InterestIdolList = (props) => {
	const { localStorageData, deleteIdol } = props;

	return (
		<WideSwiper
			modules={[Autoplay]}
			slidesPerView="auto"
			slidesPerGroup={1}
			spaceBetween={4}
			observer={true}
			observeParents={true}
			observeSlideChildren={true}
			loop={true}
			autoplay={{ delay: 6000 }}
			breakpoints={{
				480: {
					spaceBetween: 24,
				},
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
		</WideSwiper>
	);
};

const WideSwiper = styled(Swiper)`
	@media only screen and (max-width: 480px) {
		width: 100vw;
	}
`;

const CustomSlide = styled(SwiperSlide)`
	width: 98px;

	@media only screen and (max-width: 480px) {
		padding: 0 14px;
	}
`;

export default InterestIdolList;
