import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "@/common/assets/images/HeaderLogo.svg";
import ContentImage1 from "@/common/assets/images/MainContent_1.png";
import ContentImage2 from "@/common/assets/images/MainContent_2.png";
import ContentImage3 from "@/common/assets/images/MainContent_3.png";
import HeaderBackgroundImage from "@/common/assets/images/HeaderBackground.png";
import MainBackgroundImage1 from "@/common/assets/images/MainBackground_1.png";
import MainBackgroundImage2 from "@/common/assets/images/MainBackground_2.png";
import MainBackgroundImage3 from "@/common/assets/images/MainBackground_3.png";
import { PinkButton } from "@/common/ui/Button";

export default function LandingPage() {
	const navigate = useNavigate();
	return (
		<Container>
			<Header>
				<HeaderBG imgurl={HeaderBackgroundImage} />
				<HeaderTitle>
					내가 좋아하는 아이돌을<br></br>
					가장 <span>쉽게 덕질</span> 하는 방법
				</HeaderTitle>
				<HeaderLogo src={LogoImage} alt='헤더로고' />
				<HeaderButton onClick={() => navigate("/list")}>지금 시작하기</HeaderButton>
			</Header>
			<Main>
				<MainGradient>
					<MainContent imgurl={ContentImage1}>
						<ContentText>
							<h1>후원하기</h1>
							<p>
								좋아하는 아이돌에게<br></br>
								쉽게 조공해 보세요
							</p>
						</ContentText>
					</MainContent>

					<MainContent imgurl={ContentImage2}>
						<ContentText>
							<h1>이달의 아티스트</h1>
							<p>
								내 아티스트에게 1등의<br></br>
								영예를 선물하세요
							</p>
						</ContentText>
					</MainContent>

					<MainContent imgurl={ContentImage3}>
						<ContentText>
							<h1>나만의 아티스트</h1>
							<p>
								좋아하는 아티스트들의<br></br>
								소식을 모아보세요
							</p>
						</ContentText>
					</MainContent>
				</MainGradient>

				<MainSection imgurl={MainBackgroundImage1} />
				<MainSection imgurl={MainBackgroundImage2} />
				<MainSection imgurl={MainBackgroundImage3} />
			</Main>
		</Container>
	);
}

const Container = styled.div`
  background-color: #02000e;
`;

const Header = styled.div`
	position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1080px;

  @media only screen and (max-width: 744px){
    height: 1200px;
  }

  @media only screen and (max-width: 375px){
    height: 812px;
  }
`;

const HeaderBG = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 100%;
	height: 781px;
	transform: translate(-50%, -50%);
	background-image: radial-gradient(
    50% 50% at 50% 50%,
    rgba(2, 0, 14, 0.01) 10%,
    #02000E 100%
    ),url(${props => props.imgurl});
  background-repeat: no-repeat;
	background-position: center;
	background-size: auto;

	@media only screen and (max-width: 744px){
		background-size: auto 598px;
  }

  @media only screen and (max-width: 375px){
		background-size: auto 330px;
  }
`;

const HeaderTitle = styled.div`
	z-index: 1;
  margin-top: 140px;
  color: #fff;
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  line-height: 31px;
  span{
    color: #f96d69;
  }

  @media only screen and (max-width: 744px){
    margin-top: 120px;
    font-size: 20px;
    line-height: 24px;
  }

  @media only screen and (max-width: 375px){
    margin-top: 100px;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
  }
`;

const HeaderLogo = styled.img`
	z-index: 1;
  margin-top: 29px;
  width: 509px;
	height: 97px;

  @media only screen and (max-width: 744px){
    margin-top: 32px;
    width: 325px;
    height: 62px;
  }

  @media only screen and (max-width: 375px){
    margin-top: 20px;
    width: 237px;
    height: 45px;
  }
`;

const HeaderButton = styled(PinkButton)`
	z-index: 1;
  margin-top: 584px;
	max-width: 477px;
	width: 100%;
	height: 48px;
	font-size: 14px;
	font-weight: 700;

  @media only screen and (max-width: 744px){
    margin-top: 770px;
		width: 90%;

  }

  @media only screen and (max-width: 375px){
    margin-top: 451px;
    width: 230px;
    font-weight: 400;
  }
`;

// --------------------------------------

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const MainSection = styled.div`
  width: 100%;
  height: 1200px;
  background-image:
  radial-gradient(
    50% 50% at 50% 50%,
    rgba(2, 0, 14, 0) 10%,
    rgba(2, 0, 14, 0.180099) 20%,
    rgba(2, 0, 14, 0.5) 20%,
    #02000E 100%
    ), url(${props => props.imgurl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1200px 1200px;

  @media only screen and (max-width: 744px){
    height: 744px;
    background-size: 744px 740px;
  }

  @media only screen and (max-width: 375px){
    height: 812px;
    background-size: 700px 700px;

  }
`;

const ContentText = styled.div`
  position: absolute;
  top: -15%;
  left: 50%;
  width: 300px;
  height: 93px;
	transform: translate(-50%, -50%);
  text-align: center;

  h1{
    margin: 0 auto;
    color: #d2c030;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
  }

  p{
    margin: 8px auto 0;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
  }

  @media only screen and (max-width: 744px){
    p{
      font-size: 20px;
      line-height: 24px;
    }
  }

  @media only screen and (max-width: 375px){

    p{
      font-size: 20px;
      line-height: 24px;
    }
  }
`;

const MainContent = styled.div`
  position: relative;
  width: 320px;
  height: 694px;
  background-image: url(${props => props.imgurl});
	background-size: 100% 100%;


  @media only screen and (max-width: 744px){
    width: 200px;
    height: 433px;
  }

	@media only screen and (max-width: 375px){
    width: 240px;
    height: 520px;
  }
`;

const MainGradient = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 187px;
  height: 3091px;
	transform: translate(-50%, -50%);
  background: linear-gradient(
    180deg,
    #030615 0%,
    #051D31 42.67%,
    #051E32 53.12%,
    #051C30 74.27%,
    #030B1C 100%
    );

  @media only screen and (max-width: 744px){
    width: 117px;
    height: 1928px;
  }

  @media only screen and (max-width: 375px){
    width: 117px;
    height: 2133px;

    ${MainContent}:nth-child(odd){
      ${ContentText}{
        text-align: start;
      }
    }

    ${MainContent}:nth-child(even){
      ${ContentText}{
        text-align: end;
      }
    }
  }
`;
