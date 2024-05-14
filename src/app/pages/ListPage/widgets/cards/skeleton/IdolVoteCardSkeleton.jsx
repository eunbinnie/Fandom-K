import { Column, FlexContainer, Row } from "@/common/ui/Container";
import skeletonStyle from "@/common/styles/skeletonStyle";
import styled from "styled-components";
import { IdolVoteCardContainer } from "../ui/IdolVoteCard";
import { forwardRef } from "react";

const SkeletonImageContainer = styled.div`
	width: 70px;
	height: 70px;
	border-radius: 40px;
	${skeletonStyle};
`;

const SkeletonIndex = styled.div`
	width: 30px;
	height: 15px;
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
	width: 16px;
	height: 15px;
	border-radius: 10px;
	${skeletonStyle};
`;

export default forwardRef(function IdolVoteCardSkeleton(props, ref) {
	return (
		<IdolVoteCardContainer $jc="space-between" $ai="center" ref={ref}>
			<Row $gap="12px" $ai="center">
				<SkeletonImageContainer />
				<SkeletonIndex />
				<Column $fd="column" $gap="4px">
					<SkeletonNameBlock />
					<SkeletonNameBlock />
				</Column>
			</Row>
			<SkeletonVoteBlock />
		</IdolVoteCardContainer>
	);
});
