import { FlexContainer, ImageContainer, Row } from "@/shared/ui/Container";

import {
	chartItemDescription,
	chartItemIndex,
	chartItemName,
} from "@/shared/styles/typo";
import styled from "styled-components";
import { formatNumber } from "@/shared/utilities/format";
import { forwardRef } from "react";

export const IdolChartCardContainer = styled(FlexContainer)`
	border-bottom: 1px solid #ffffff1a;
	height: 85px;
`;

const ChartItemDescription = styled.span`
	${chartItemDescription}
`;

const ChartItemName = styled.span`
	${chartItemName}
`;

const ChartItemIndex = styled.span`
	${chartItemIndex}
`;

export default forwardRef(function IdolChartCard({ item, index }, ref) {
	const { group, name, profilePicture, totalVotes } = item;
	return (
		<IdolChartCardContainer $jc="space-between" $ai="center" ref={ref}>
			<Row $gap="12px" $ai="center">
				<ImageContainer src={profilePicture} alt={`${name} 사진`} />
				<ChartItemIndex>{index + 1}</ChartItemIndex>
				<ChartItemName>{group}</ChartItemName>
				<ChartItemName>{name}</ChartItemName>
			</Row>
			<ChartItemDescription>
				{formatNumber(totalVotes) + "표"}
			</ChartItemDescription>
		</IdolChartCardContainer>
	);
});
