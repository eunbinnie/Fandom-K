import {} from "react";
import "./index.scss";
import widget from "@/common/utilities/widget";

export default function Column(
	props = {
		/* html */ id: null,
		class: [],
		style: {},
		children: null,
		/* props */ direction: "top-to-bottom",
		main_axis: "flex-start",
		cross_axis: "stretch",
	},
) {
	return <section {...widget("Column", props)}>{props.children}</section>;
}
