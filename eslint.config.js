
import globals from "globals";

import js from "@eslint/js";

import eslint_plugin_react from "eslint-plugin-react";
import eslint_plugin_react_hooks from "eslint-plugin-react";
import eslint_plugin_react_refresh from "eslint-plugin-react";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default
[
	{
		ignores:
		[
			"dist/**",
			"node_modules/**",
		],
	},
	js.configs.recommended,
	{
		files:
		[
			"**/*.js",
			"**/*.jsx",
		],
		rules:
		{
			...eslint_plugin_react.configs.recommended.rules,
			...eslint_plugin_react_hooks.configs.recommended.rules,
			...eslint_plugin_react_refresh.configs.recommended.rules,
			//
			// custom rules
			//
			"react/prop-types": ["off", {}],
			"react/react-in-jsx-scope": ["off", {}],
			"react/no-unknown-property": ["error", { ignore: ["class"] }],
		},
		plugins:
		{
			"react": eslint_plugin_react,
			"react_hooks": eslint_plugin_react_hooks,
			"react_refresh": eslint_plugin_react_refresh,
		},
		settings:
		{
			"react":
			{
				version: "detect",
			},
		},
		languageOptions:
		{
			globals:
			{
				...globals.browser,
			},
			parserOptions:
			{
				ecmaFeatures:
				{
					jsx: true,
				},
			},
		},
	},
];
