export default function ArrowLeft({ /* html */ id, /* props */ color = "white", width = 13, height = 24 })
{
	return (<svg id={id} width={width} height={height} viewBox={[0, 0, width, height].join("\u0020")} fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 2.3335L2.17851 11.155C1.52764 11.8059 1.52764 12.8611 2.17851 13.512L11 22.3335" stroke={color} strokeWidth="3.33333" strokeLinecap="round"/></svg>);
}
