import { Link } from "react-router-dom";

import myLogo from "@/common/assets/icons/my_logo.svg";
import HomeLogo from "../assets/icons/HomeLogo";
import styled from "styled-components";

export default function Header() {
	return (
		<HeaderSection>
			<Box></Box>
			<Box>
				<Logo to="/">
					<HomeLogo />
				</Logo>
			</Box>

			<Box right="right">
				<Link to="/mypage">
					<img src={myLogo} alt="마이페이지" />
				</Link>
			</Box>
		</HeaderSection>
	);
}

//헤더
const HeaderSection = styled.header`
	position: relative;
	padding: 23px 0;
	display: flex;
	align-items: center;

	@media only screen and (max-width: 480px) {
		padding: 12px 0;
	}
`;

//logo-box
const Box = styled.div`
	flex: 1;
	text-align: ${({ right }) => (right ? right : "center")};

	> a {
		display: inline-block;
	}
`;

const Logo = styled(Link)`
	> svg {
		width: 100%;
	}

	@media only screen and (max-width: 744px) {
		width: 120px;
	}

	@media only screen and (max-width: 480px) {
		width: 108px;
	}
`;
