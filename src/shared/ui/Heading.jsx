import styled from "styled-components";

const HeadingContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

export function Heading({ children }) {
	return <HeadingContainer>{children}</HeadingContainer>;
}

Heading.Title = styled.span`
	font-size: 24px;
	font-weight: 700;
	line-height: 26px;
	text-align: left;
	color: white;
	@media (width<=1199px) {
		font-size: 20px;
	}
	@media (width<=767px) {
		font-size: 16px;
	}
`;
