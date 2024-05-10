import { FlexContainer, Row } from "@/shared/ui/Container";
import skeletonStyle from "@/shared/styles/skeletonStyle";
import styled from "styled-components";
import { IdolChartCardContainer } from "../ui/IdolChartCard";
import { forwardRef } from "react";

const SkeletonImageContainer = styled.div`
	width: 70px;
	height: 70px;
	border-radius: 40px;
	${skeletonStyle};
`;

const SkeletonNameBlock = styled.div`
	width: 120px;
	height: 15px;
	border-radius: 10px;
	${skeletonStyle};
`;

const SkeletonVoteBlock = styled.div`
	width: 60px;
	height: 15px;
	border-radius: 10px;
	${skeletonStyle};
`;

export default forwardRef(function IdolChartCardSkeleton(props, ref) {
	return (
		<IdolChartCardContainer $jc="space-between" $ai="center" ref={ref}>
			<Row $gap="12px" $ai="center">
				<SkeletonImageContainer />
				<SkeletonNameBlock />
			</Row>
			<SkeletonVoteBlock />
		</IdolChartCardContainer>
	);
});
