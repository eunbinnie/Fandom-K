import styled from "styled-components";

const RoundedImage = styled.img`
	width: 60px;
	height: 60px;
	border-radius: 40px;
`;

const RoundedDiv = styled.div`
	width: 70px;
	height: 70px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 40px;
	border: 1px solid #f96d69;
`;

export const ImageContainer = ({ src, alt }) => (
	<RoundedDiv>
		<RoundedImage src={src} alt={alt} />
	</RoundedDiv>
);

export const FlexContainer = styled.div`
	display: flex;
	justify-content: ${({ $jc }) => $jc};
	align-items: ${({ $ai }) => $ai};
	flex-direction: ${({ $fd }) => $fd};
	gap: ${({ $gap }) => $gap};
`;

export const Spacer = styled.div`
	flex: ${({ $flex }) => $flex};
`;

export const Row = styled(FlexContainer)`
	flex-direction: "row";
`;

export const Column = styled(FlexContainer)`
	flex-direction: "column";
`;
