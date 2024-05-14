export default function ArrowRight({ /* html */ id, /* props */ color = "white", width = 13, height = 24 })
{
	return (<svg id={id} width={width} height={height} viewBox={[0, 0, width, height].join("\u0020")} fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 21.6665L10.8215 12.845C11.4724 12.1941 11.4724 11.1389 10.8215 10.488L2 1.6665" stroke={color} strokeWidth="3.33333" strokeLinecap="round"/></svg>);
}
