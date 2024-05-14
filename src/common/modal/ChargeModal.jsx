import { useState } from "react";
import styled from "styled-components";
import { Modal } from "@/app";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import CreditIcon from "@/common/assets/icons/CreditIcon";
import ModalCancelIcon from "@/common/assets/icons/ModalCancelIcon";
import ReChargeModal from "./ReChargeModal";

export default function RadioModal({ options, openModal }) {
	const [credit, setCredit] = useLocalStorage("credit", 0);
	const [selectedOption, setSelectedOption] = useState(null);

	const handleOptionChange = (option) => {
		setSelectedOption(option);
	};

	const handleCharge = () => {
		setCredit(credit + selectedOption);
		let timeVar = setTimeout(Modal.instance.close, 3000);
		const modal = new Modal(
			(
				<ReChargeModal
					options={options}
					openModal={openModal}
					timeVar={timeVar}
					selectedOption={selectedOption}
				/>
			),
		);
		modal.open();
	};

	return (
		<ChargeModal>
			<Text>크레딧 충전하기</Text>
			<CloseButton onClick={() => Modal.instance.close()}>
				<ModalCancelIcon />
			</CloseButton>
			<RadioWrapper>
				{options.map((option, index) => (
					<RadioLabel key={index}>
						<ValueWrapper>
							<CreditIcon />
							{option}
						</ValueWrapper>
						<CustomRadio
							type="radio"
							value={option}
							checked={selectedOption === option}
							onChange={() => handleOptionChange(option)}
						/>
					</RadioLabel>
				))}
			</RadioWrapper>
			<CommonButton
				disabled={selectedOption === null ? true : false}
				onClick={handleCharge}
			>
				충전하기
			</CommonButton>
		</ChargeModal>
	);
}

const CloseButton = styled.button`
	position: absolute;
	top: 24px;
	right: 20px;
	border: none;
	background-color: #181d26;
	cursor: pointer;
`;

const CommonButton = styled.button`
	width: 295px;
	height: 42px;
	border-radius: 3px;
	border: none;
	background: ${(props) =>
		props.disabled ? "#808080" : "linear-gradient(to left, #f86f65, #fe5493)"};
	color: #fff;
	font-size: 14px;
	font-weight: 700;
	cursor: pointer;
`;

const Text = styled.p`
	color: #fff;
	font-size: 16px;
	font-weight: 500;
	line-height: 26px;
	span {
		color: #f96d69;
	}
`;

const RadioWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	margin-top: 70px;
`;

const ValueWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 6.5px;
`;

const RadioLabel = styled.label`
	box-sizing: border-box;
	padding: 18px 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 295px;
	height: 62px;
	border-radius: 8px;
	border: 1px solid #f7f7f8;
	background-color: #020003;
	color: #fff;
	font-size: 20px;
	font-weight: 700;
`;

const CustomRadio = styled.input.attrs({ type: "radio" })`
	appearance: none; // 기본 브라우저에서 기본 스타일 제거
	display: inline-block;
	width: 16px;
	height: 16px;
	box-shadow: 0 0 0 1px #8c92ab; // radio 버튼 테두리
	border: 2px solid #fff; // 테두리와 원 사이의 색상
	background-color: #8c92ab; // radio 버튼 내부 원 색상
	border-radius: 50%;

	// 체크될 시에, 변화되는 스타일 설정
	&:checked {
		box-shadow: 0 0 0 1px #f96d69;
		border: 2px solid #fff;
		background-color: #f96d69;
	}
`;

const ChargeModal = styled.div`
	position: relative;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 31px;
	width: 327px;
	height: 372px;
	border-radius: 8px;
	background-color: #181d26;

	${CloseButton} {
		right: 16px;
	}

	${Text} {
		position: absolute;
		top: 25px;
		left: 17px;
		font-size: 18px;
		font-weight: 600;
		line-height: 21px;
	}
`;

// -------------------------------------------------------

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
