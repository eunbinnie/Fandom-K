import { createPortal } from "react-dom";
import styled from "styled-components";

const Overlay = styled.div`
	position: fixed;
	inset: 0;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ModalContainer = styled.div``;

export default function Modal({ children, label = "" }) {
	return (
		<>
			{createPortal(
				<Overlay>
					<ModalContainer role="dialog" aria-labelledby={label}>
						{children}
					</ModalContainer>
				</Overlay>,
				document.body,
			)}
		</>
	);
}
