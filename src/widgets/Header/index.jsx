import {} from "react";
import "./index.scss";
import widget from "@/common/utilities/widget";

import logo_png from "@/common/assets/images/logo.png";
import avatar_png from "@/common/assets/images/avatar.png";

export default function Header(
	props = {
		/* html */ id: null,
		class: [],
		style: {},
		children: null /* props */,
	},
) {
	return (
		<section {...widget("Header", props)}>
			<div className="container">
				<div className="left">{/* spacer */}</div>
				<img className="logo" src={logo_png} alt="logo"></img>
				<div className="right">
					<img className="avatar" src={avatar_png} alt="avatar"></img>
				</div>
			</div>
		</section>
	);
}
