import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { SelectContext } from "@/app/pages/MyPage";
import Check from "@/common/ui/Check";

import deleteIcon from "@/common/assets/icons/DeleteIcon.svg";

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
				{isSelected && isAddingMode && <Check padding={padding} />}
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
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	word-break: break-all;
`;

const Group = styled.h6`
	font-size: 14px;
	font-weight: 400;
	line-height: 1.2;
	color: #fff;
	opacity: 0.6;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	word-break: break-all;
`;

export default IdolCard;
