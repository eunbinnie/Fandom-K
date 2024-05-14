import { MenuButton } from "@/common/ui/Button";
import { FlexContainer, Row, Spacer } from "@/common/ui/Container";
import styled from "styled-components";

export const MenuButtonDescription = styled.span`
	color: #ffffff;
	font-size: 14px;
	font-weight: 400;
	line-height: 18px;
	text-align: center;
	letter-spacing: -0.16500002145767212px;
`;

export default function SelectGender({ onChange, gender, isActive }) {
	const handleMenuClick = (e) => {
		if (gender === e.currentTarget.name) return;
		onChange(e.currentTarget.name);
	};
	return (
		<Row style={{ marginBottom: 24 }}>
			<MenuButton name="female" onClick={handleMenuClick} $isActive={isActive}>
				<MenuButtonDescription>이달의 여자 아이돌</MenuButtonDescription>
			</MenuButton>
			<MenuButton name="male" onClick={handleMenuClick} $isActive={!isActive}>
				<MenuButtonDescription>이달의 남자 아이돌</MenuButtonDescription>
			</MenuButton>
		</Row>
	);
}
