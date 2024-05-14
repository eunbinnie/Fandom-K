import React from "react";
import styled from "styled-components";

import checkIcon from "@/common/assets/icons/Checkmark.svg";

const Check = ({ padding }) => {
	return (
		<CustomCheck padding={padding}>
			<CheckIcon>
				<img src={checkIcon} />
			</CheckIcon>
		</CustomCheck>
	);
};

const CustomCheck = styled.div`
	background: linear-gradient(
		271.36deg,
		rgba(249, 110, 104, 0.5) -9.84%,
		rgba(254, 87, 143, 0.5) 107.18%
	);
	width: calc(100% - ${({ padding }) => padding ?? 5}px * 2);
	height: calc(100% - ${({ padding }) => padding ?? 5}px * 2);
	position: absolute;
	top: ${({ padding }) => padding ?? 5}px;
	left: ${({ padding }) => padding ?? 5}px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;

	@media only screen and (max-width: 480px) {
		width: calc(100% - 5px * 2);
		height: calc(100% - 5px * 2);
		top: 5px;
		left: 5px;
	}
`;

const CheckIcon = styled.div`
	@media only screen and (max-width: 480px) {
		width: 40px;
		height: 40px;
		display: flex;
	}
`;

export default Check;
