import { css } from "styled-components";
import { skeleton } from "./keyframes";

export default css`
	background-color: #363636;
	position: relative;
	overflow: hidden;
	z-index: 1;
	&:after {
		content: " ";
		display: block;
		position: absolute;
		left: 0;
		right: 0;
		height: 100%;
		background-repeat: no-repeat;
		background-image: linear-gradient(
			90deg,
			rgba(54, 54, 54, 1) 20%,
			rgba(144, 144, 144, 1) 50%,
			rgba(54, 54, 54, 1) 80%
		);
		transform: translateX(-100%);
		animation-name: ${skeleton};
		animation-duration: 1.5s;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in-out;
		animation-direction: normal;
	}
`;
