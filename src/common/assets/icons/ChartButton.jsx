export default function ChartButton({ width = 24, height = 25, ...props }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			fill="none"
			{...props}
		>
			<path
				stroke="#fff"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M8 10.5v6M12 12.5v4M16 8.5v8"
			/>
			<rect
				width={18}
				height={16}
				x={3}
				y={4.5}
				stroke="#fff"
				strokeWidth={2}
				rx={2}
			/>
		</svg>
	);
}
