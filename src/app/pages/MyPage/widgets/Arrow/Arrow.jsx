import React from "react";
import styled from "styled-components";

const Arrow = (props) => {
	const { className, onClick, imgSrc, alt, position } = props;

	return (
		<ArrowButton
			className={className}
			onClick={onClick}
			position={{ value: position }}
		>
			<img src={imgSrc} alt={alt} />
		</ArrowButton>
	);
};

const ArrowButton = styled.button`
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
	left: ${({ position }) => (position.value === "left" ? "-61px" : "auto")};
	right: ${({ position }) => (position.value === "right" ? "-61px" : "auto")};

	&::after {
		content: "";
	}

	@media only screen and (max-width: 1370px) {
		left: ${({ position }) => (position.value === "left" ? "0" : "auto")};
		right: ${({ position }) => (position.value === "right" ? "0" : "auto")};
	}

	@media only screen and (max-width: 480px) {
		display: none;
	}
`;

export default Arrow;
