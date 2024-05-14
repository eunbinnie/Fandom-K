import styled from "styled-components";
import { Modal } from "@/app";
import ModalCancelIcon from "@/common/assets/icons/ModalCancelIcon";
import BigCreditIcon from "../assets/icons/BigCreditIcon";

export default function ReOpenModal({
	children,
	buttonDescription,
	handleReOpen,
}) {
	return (
		<TestModal>
			<CloseButton onClick={() => Modal.instance.close()}>
				<ModalCancelIcon />
			</CloseButton>
			<BigCreditIcon />
			{children}
			<CommonButton onClick={handleReOpen}>
				{buttonDescription ? buttonDescription : "다시 하시겠습니까?"}
			</CommonButton>
		</TestModal>
	);
}

export const Text = styled.p`
	color: #fff;
	font-size: 16px;
	font-weight: 500;
	line-height: 26px;
	span {
		color: #f96d69;
	}
`;

const CommonButton = styled.button`
	width: 295px;
	height: 42px;
	border-radius: 3px;
	border: none;
	background: linear-gradient(to left, #f86f65, #fe5493);
	color: #fff;
	font-size: 14px;
	font-weight: 700;
	cursor: pointer;
`;

const CloseButton = styled.button`
	position: absolute;
	top: 24px;
	right: 20px;
	border: none;
	background-color: #181d26;
	cursor: pointer;
`;

const TestModal = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	padding: 32px 16px;
	width: 327px;
	height: 372px;
	border-radius: 8px;
	background-color: #181d26;
	${CloseButton} {
		right: 16px;
	}
`;
