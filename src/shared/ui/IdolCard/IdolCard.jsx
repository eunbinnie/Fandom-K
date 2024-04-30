import React from 'react';
import styled from 'styled-components';

import TestImg from '../../assets/images/test_img.png';

const IdolCard = () => {
	return (
		<Card>
			<ImgArea>
				<Img src={TestImg} />
			</ImgArea>
			<TextArea>
				<Name>민지</Name>
				<Group>뉴진스</Group>
			</TextArea>
		</Card>
	);
};

const Card = styled.div`
	display: grid;
	gap: 8px;
	background-color: var(--black-02000e);
	/* 카드 너비 수정 필요 (현재 고정해둠) */
	width: 128px;
`;

const ImgArea = styled.div`
	border-radius: 50%;
	border: 1.3px solid #f77063;
	padding: ${({padding}) => padding ?? 5}px;
	overflow: hidden;
	cursor: pointer;
`;

const Img = styled.img`
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