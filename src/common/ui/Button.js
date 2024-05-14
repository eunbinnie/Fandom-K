import { css, styled } from "styled-components";

export const buttonStyle = css`
	color: white;
	&:hover {
		cursor: pointer;
	}
	&:disabled {
		background: var(--gray3);
	}
`;

export const PinkButton = styled.button.attrs({
	type: "button",
})`
	background: linear-gradient(90deg, #f86f65 0%, #fe5493 100%);
	width: ${({ width }) => width ?? "auto"};
	height: ${({ height }) => height ?? "auto"};
	padding: 3.5px 14px 4.5px;
	border: 0;
	border-radius: 3px;
	${buttonStyle};
`;

export const MenuButton = styled.button`
	background-color: ${({ $isActive }) =>
		$isActive == true ? "#FFFFFF1A" : "inherit"};
	height: 42px;
	padding: 12px;
	border: 0;
	flex: 1;
	border-bottom: ${({ $isActive }) =>
		$isActive == true ? "1px solid white" : null};
	${buttonStyle};
`;
