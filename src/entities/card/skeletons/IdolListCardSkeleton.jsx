import React from "react";
import styled from "styled-components";
import skeletonStyle from "@/shared/styles/skeletonStyle";

const IdolListCardSkeleton = ({ count = 16 }) => {
	return (
		<IdolList>
			{Array.from({ length: count }).map((_, index) => {
				return (
					<Card key={index}>
						<ImgArea />
						<TextArea>
							<Name>
								<NameText />
							</Name>
							<Group />
						</TextArea>
					</Card>
				);
			})}
		</IdolList>
	);
};

const IdolList = styled.div`
	width: 100%;
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	grid-template-columns: repeat(8, 1fr);
	gap: 31px 22px;
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

const Card = styled.div`
	display: grid;
	gap: 8px;
`;

const ImgArea = styled.div`
	border-radius: 50%;
	padding: 6.48px;
	overflow: hidden;
	aspect-ratio: 1 / 1;
	${skeletonStyle};
	&::after {
		top: 0;
	}
`;

const TextArea = styled.div`
	display: grid;
	gap: 2px;
	text-align: center;
`;

const Name = styled.div`
	width: 50px;
	height: 25.6px;
	padding: 6.5px 0;
	margin: 0 auto;
`;

const NameText = styled.div`
	height: 100%;
	border-radius: 7px;
	${skeletonStyle};
	&::after {
		top: 0;
	}
`;

const Group = styled.div`
	width: 70px;
	height: 16.8px;
	margin: 0 auto;
	border-radius: 5px;
	${skeletonStyle};
	&::after {
		top: 0;
	}
`;

export default IdolListCardSkeleton;
