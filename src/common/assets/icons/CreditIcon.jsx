import * as React from "react";
const CreditIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={25}
		height={28}
		fill="none"
		{...props}
	>
		<path fill="#fff" d="m10 14.241 2-3 2 3-2 3-2-3Z" />
		<g filter="url(#a)">
			<path
				fill="url(#b)"
				fillRule="evenodd"
				d="m12 6.241 5.5 7.874-5.5 7.847-5.5-7.847L12 6.241Zm-4.296 7.873L12 20.244l4.296-6.13L12 7.964l-4.296 6.15Z"
				clipRule="evenodd"
			/>
		</g>
		<defs>
			<linearGradient
				id="b"
				x1={12}
				x2={12}
				y1={6.241}
				y2={21.962}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#FF8282" />
				<stop offset={1} stopColor="#F96969" />
			</linearGradient>
			<filter
				id="a"
				width={23}
				height={27.721}
				x={0.5}
				y={0.241}
				colorInterpolationFilters="sRGB"
				filterUnits="userSpaceOnUse"
			>
				<feFlood floodOpacity={0} result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					result="hardAlpha"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				/>
				<feOffset />
				<feGaussianBlur stdDeviation={3} />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix values="0 0 0 0 1 0 0 0 0 0.666667 0 0 0 0 0.666667 0 0 0 1 0" />
				<feBlend
					in2="BackgroundImageFix"
					result="effect1_dropShadow_2189_1387"
				/>
				<feBlend
					in="SourceGraphic"
					in2="effect1_dropShadow_2189_1387"
					result="shape"
				/>
			</filter>
		</defs>
	</svg>
);
export default CreditIcon;
