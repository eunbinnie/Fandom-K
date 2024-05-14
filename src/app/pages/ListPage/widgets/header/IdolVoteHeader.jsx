import ArrowLeft from "@/common/assets/icons/ArrowLeft";
import ModalCancelIcon from "@/common/assets/icons/ModalCancelIcon";
import { useCustomMediaQuery } from "@/common/hooks/useCustomMediaQuery";
import { modalTitleTypo } from "@/common/styles/typo";
import styled from "styled-components";

const VoteTitle = styled.h2`
	display: flex;
	align-items: center;
	${modalTitleTypo}
`;

const VoteHeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	@media (width<=767px) {
		background-color: #02000ecc;
		justify-content: space-between;
		padding-inline: 24px;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		height: 67px;
		z-index: 3;
	}
`;

const CancelButton = styled.button`
	background-color: inherit;
	border: none;
	&:hover {
		cursor: pointer;
	}
`;

export default function IdolVoteHeader({ gender, onCancel }) {
	const { isMobile } = useCustomMediaQuery();
	return (
		<>
			{isMobile ? (
				<VoteHeaderContainer>
					<CancelButton onClick={onCancel}>
						<ArrowLeft width="24" />
					</CancelButton>
					<VoteTitle>
						이달의 {gender === "male" ? "남자" : "여자"} 아이돌
					</VoteTitle>
					<div style={{ width: "24px" }}></div>
				</VoteHeaderContainer>
			) : (
				<VoteHeaderContainer>
					<VoteTitle>
						이달의 {gender === "male" ? "남자" : "여자"} 아이돌
					</VoteTitle>
					<CancelButton onClick={onCancel}>
						<ModalCancelIcon />
					</CancelButton>
				</VoteHeaderContainer>
			)}
		</>
	);
}
