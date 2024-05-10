import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SelectContext } from "@/pages/MyPage/ui/MyPage";

import checkIcon from "../../assets/icons/Checkmark.svg";
import deleteIcon from "@/shared/assets/icons/DeleteIcon.svg";

const IdolCard = (props) => {
	const { info, padding, chooseIdol, remove, deleteIdol } = props;
	const isAddingMode = useContext(SelectContext);
	const { profilePicture, name, group } = info;
	const [isSelected, setIsSelected] = useState(false);

	useEffect(() => {
		if (!isAddingMode) {
			setIsSelected(false);
		}
	}, [isAddingMode]);

	const handleCardClick = () => {
		if (typeof chooseIdol === "function") {
			setIsSelected(!isSelected);
			chooseIdol();
		}
	};

	return (
		<Card>
			<ImgArea
				padding={padding}
				pointerEvents={typeof chooseIdol === "function" ? "auto" : "none"}
				onClick={handleCardClick}
			>
				<Img src={profilePicture} />
				{isSelected && isAddingMode && (
					<Check padding={padding}>
						<CheckIcon>
							<img src={checkIcon} />
						</CheckIcon>
					</Check>
				)}
			</ImgArea>
			<TextArea>
				<Name>{name}</Name>
				<Group>{group}</Group>
			</TextArea>
			{remove && (
				<DeleteButton onClick={deleteIdol}>
					<img src={deleteIcon} />
				</DeleteButton>
			)}
		</Card>
	);
};

const Card = styled.div`
	position: relative;
	display: grid;
	gap: 8px;
	flex: 0 0 auto;
`;

const ImgArea = styled.div`
	border-radius: 50%;
	border: 1.3px solid #f77063;
	padding: ${({ padding }) => padding ?? 5}px;
	overflow: hidden;
	cursor: pointer;
	aspect-ratio: 1 / 1;
	position: relative;
	pointer-events: ${({ pointerEvents }) => pointerEvents ?? "auto"};

	@media only screen and (max-width: 480px) {
		padding: 5px;
	}
`;

const Check = styled.div`
	background: linear-gradient(
		271.36deg,
		rgba(249, 110, 104, 0.5) -9.84%,
		rgba(254, 87, 143, 0.5) 107.18%
	);
	width: calc(100% - ${({ padding }) => padding ?? 5}px * 2);
	height: calc(100% - ${({ padding }) => padding ?? 5}px * 2);
	position: absolute;
	top: ${({ padding }) => padding ?? 5}px;
	left: ${({ padding }) => padding ?? 5}px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;

	@media only screen and (max-width: 480px) {
		width: calc(100% - 5px * 2);
		height: calc(100% - 5px * 2);
		top: 5px;
		left: 5px;
	}
`;

const CheckIcon = styled.div`
	@media only screen and (max-width: 480px) {
		width: 40px;
		height: 40px;
		display: flex;
	}
`;

const DeleteButton = styled.button`
	position: absolute;
	top: 0;
	right: 0;
	border-radius: 50%;
	background-color: #fff;
	aspect-ratio: 1 / 1;
	border: 2.87px solid #02000e;
	display: flex;
	justify-content: center;
	align-items: center;

	@media only screen and (max-width: 480px) {
		> img {
			width: 8px;
		}
	}
`;

const Img = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
`;

const TextArea = styled.div`
	display: grid;
	gap: 2px;
	text-align: center;
`;

const Name = styled.h5`
	font-size: 16px;
	font-weight: 700;
	line-height: 1.6;
	color: #f4efef;
`;

const Group = styled.h6`
	font-size: 14px;
	font-weight: 400;
	line-height: 1.2;
	color: #fff;
	opacity: 0.6;
`;

export default IdolCard;
