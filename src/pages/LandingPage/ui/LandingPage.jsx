import { useNavigate } from "react-router-dom";
import LogoImage from "@/shared/assets/images/HeaderLogo.svg";
import ContentImage1 from "@/shared/assets/images/MainContent_1.png";
import ContentImage2 from "@/shared/assets/images/MainContent_2.png";
import ContentImage3 from "@/shared/assets/images/MainContent_3.png";
import HeaderBackgroundImage from "@/shared/assets/images/HeaderBackground.png";
import MainBackgroundImage1 from "@/shared/assets/images/MainBackground_1.png";
import MainBackgroundImage2 from "@/shared/assets/images/MainBackground_2.png";
import MainBackgroundImage3 from "@/shared/assets/images/MainBackground_3.png";
import {
	Header,
	HeaderTitle,
	HeaderLogo,
	HeaderButton,
	MainGradient,
	MainSection,
	Main,
} from "@/pages/LandingPage/ui/LadingPage";
import ContentItem from "@/pages/LandingPage/ui/ContenItem";

export default function LandingPage() {
	const navigate = useNavigate();
	const mainBackgroundImages = [
		MainBackgroundImage1,
		MainBackgroundImage2,
		MainBackgroundImage3,
	];
	return (
		<>
			<Header $imgurl={HeaderBackgroundImage}>
				<HeaderTitle>
					내가 좋아하는 아이돌을<br></br>
					가장 <span>쉽게 덕질</span> 하는 방법
				</HeaderTitle>
				<HeaderLogo src={LogoImage} alt="헤더로고" />
				<HeaderButton
					onClick={() => navigate("/list")}
					height="48px"
					width="477px"
				>
					지금 시작하기
				</HeaderButton>
			</Header>

			<Main>
				<MainGradient>
					<ContentItem
						imgurl={ContentImage1}
						title="후원하기"
						description="좋아하는 아이돌에게 쉽게 조공해 보세요"
					/>
					<ContentItem
						imgurl={ContentImage2}
						title="이달의 아티스트"
						description="내 아티스트에게 1등의 영예를 선물하세요"
					/>
					<ContentItem
						imgurl={ContentImage3}
						title="나만의 아티스트"
						description="좋아하는 아티스트들의 소식을 모아보세요"
					/>
				</MainGradient>

				{mainBackgroundImages.map((image, index) => (
					<MainSection key={index} $imgurl={image} />
				))}
			</Main>
		</>
	);
}
