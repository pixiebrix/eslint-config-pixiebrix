"use strict";

module.exports = {
	settings: {
		react: {
			version: "detect",
		},
	},
	extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
	rules: {
		"react/no-array-index-key": "error",
		"react/no-unstable-nested-components": ["error", { allowAsProps: true }],
		"react/forbid-elements": [
			"error",
			{
				forbid: [
					{ element: "b", message: "use <strong> instead" },
					{ element: "i", message: "use <em> instead" },
				],
			},
		],
		"react/jsx-max-depth": ["error", { max: 5 }],

		// TODO: Drop/replace `allowExpressions` after https://github.com/jsx-eslint/eslint-plugin-react/issues/2584
		// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md#allowexpressions
		"react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],

		// We don't do that here
		"react/prop-types": "off",
	},
};
