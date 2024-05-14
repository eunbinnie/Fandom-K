import {
	Column,
	FlexContainer,
	ImageContainer,
	Row,
} from "@/common/ui/Container";
import {
	chartItemDescription,
	chartItemIndex,
	chartItemName,
} from "@/common/styles/typo";

import styled from "styled-components";
import { formatNumber } from "@/common/utilities/format";
import { forwardRef } from "react";

export const IdolVoteCardContainer = styled(FlexContainer)`
	border-bottom: 1px solid #ffffff1a;
	height: 86px;
	&:has(input:checked) {
		background-color: #ffffff1a;
	}
`;

const VoteDescription = styled.span`
	${chartItemDescription}
`;

const VoteName = styled.span`
	${chartItemName}
`;

const VoteIndex = styled.span`
	${chartItemIndex}
`;

const Input = styled.input`
	appearance: none;
`;

export default forwardRef(function IdolVoteCard({ item, index, onClick }, ref) {
	const { group, name, profilePicture, totalVotes } = item;

	return (
		<IdolVoteCardContainer
			as="label"
			htmlFor={item.id}
			$jc="space-between"
			$ai="center"
			ref={ref}
		>
			<Row value={item.id} $gap="12px" $ai="center">
				<ImageContainer src={profilePicture} />
				<VoteIndex>{index + 1}</VoteIndex>
				<Column $fd="column" $gap="4px">
					<VoteName>{`${group} ${name}`}</VoteName>
					<VoteDescription>{`${formatNumber(totalVotes)}표`}</VoteDescription>
				</Column>
			</Row>
			<Input type="radio" id={item.id} name="vote" onClick={onClick} />
		</IdolVoteCardContainer>
	);
});
