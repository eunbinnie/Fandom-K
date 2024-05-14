const ModalCancelIcon = ({ width = 16, height = 16, ...props }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		fill="none"
		{...props}
	>
		<path
			fill="#fff"
			fillOpacity={0.5}
			fillRule="evenodd"
			d="M14.043 15.457a1 1 0 0 0 1.414-1.414L9.414 8l6.043-6.043A1 1 0 0 0 14.043.543L8 6.586 1.957.543A1 1 0 0 0 .543 1.957L6.586 8 .543 14.043a1 1 0 1 0 1.414 1.414L8 9.414l6.043 6.043Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default ModalCancelIcon;
