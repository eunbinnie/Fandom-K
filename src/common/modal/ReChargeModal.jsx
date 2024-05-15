import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Modal } from "@/app";
import ModalCancelIcon from "@/common/assets/icons/ModalCancelIcon";
import RadioModal from "./ChargeModal";
import BigCreditIcon from "../assets/icons/BigCreditIcon";

export default function ReChargeModal({ options, openModal, selectedOption }) {
	const [count, setCount] = useState(3);
	const interval = useRef();

	const handleReCharge = () => {
		Modal.instance.close();
		new Modal(<RadioModal options={options} openModal={openModal} />).open();
	};

	const handleClose = () => {
		Modal.instance.close();
	};

	useEffect(() => {
		interval.current = setInterval(() => {
			setCount((prevCount) => prevCount - 1);
		}, 1000);

		if (count === 0) clearInterval(interval.current);
		return () => clearInterval(interval.current);
	}, [count]);

	return (
		<TestModal>
			<CloseButton
				onClick={() => {
					handleClose();
				}}
			>
				<ModalCancelIcon />
			</CloseButton>
			<BigCreditIcon />
			<Text>
				<span>{selectedOption}</span>크레딧이 충전되었습니다!
			</Text>
			<Text>{count}초 뒤에 자동으로 닫힙니다</Text>
			<CommonButton
				onClick={() => {
					handleReCharge();
				}}
			>
				MoreCharge?
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
