import { Modal } from "@/app";
import CreditIcon from "@/common/assets/icons/CreditIcon";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import { buttonStyle } from "@/common/ui/Button";
import { Column, FlexContainer } from "@/common/ui/Container";
import { formatNumber } from "@/common/utilities/format";
import styled from "styled-components";
import RadioModal from "@/common/modal/ChargeModal";
import { CHARGE_OPTIONS } from "@/common/constant/constant";

const CreditContainer = styled(FlexContainer)`
	border-radius: 8px;
	border: 1px solid #f1eef9cc;
	height: 131px;
	padding-inline: 78px;
	@media screen and (width<=1199px) {
		padding-inline: 64px;
	}
	@media screen and (width<=767px) {
		height: 87px;
		padding-inline: 20px;
	}
`;

const CreditButton = styled.div`
	${buttonStyle};
	color: var(--orange);
	font-size: 16px;
	font-weight: 700;
	line-height: 26px;
	letter-spacing: 0.05em;
	text-align: left;
	@media screen and (width<=767px) {
		font-size: 13px;
	}
`;

const CreditDescription = styled.div`
	color: #ffffff99;
	font-size: 16px;
	font-weight: 400;
	line-height: 19.09px;
	@media screen and (width<=767px) {
		font-size: 12px;
		line-height: 14.32px;
	}
`;

const MyCredit = styled(FlexContainer)`
	color: #ffffffde;
	font-size: 24px;
	font-weight: 700;
	line-height: 26px;
	text-align: left;
`;

export default function ChargeCredit() {
	const [credit, setCredit] = useLocalStorage("credit", 0);

	const handleOpenChargeModal = () => {
		Modal.open(
			<RadioModal
				options={CHARGE_OPTIONS}
				openModal={handleOpenChargeModal}
			/>,
			Modal.shake,
		);
	};

	return (
		<CreditContainer $jc="space-between" $ai="center">
			<Column $fd="column" $gap="14px">
				<CreditDescription>내 크레딧</CreditDescription>
				<MyCredit $ai="center">
					<CreditIcon />
					<span>{formatNumber(credit)}</span>
				</MyCredit>
			</Column>
			<CreditButton onClick={handleOpenChargeModal}>충전하기</CreditButton>
		</CreditContainer>
	);
}
