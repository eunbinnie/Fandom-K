import path from "path";
import react from "@vitejs/plugin-react";

/** @type {import("vite").UserConfig} */
export default
{
	plugins:
	[
		react()
	],
	resolve:
	{
		alias:
		[
			// eslint-disable-next-line no-undef
			{ find: "@", replacement: path.resolve(__dirname, "src") }
		]
	}
};
