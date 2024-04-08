module.exports = {
	rules: {
		// It helps us identify the chunks generated/loaded in the browser
		"import/dynamic-import-chunkname": [
			"error",
			{
				webpackChunknameFormat: "[a-zA-Z0-57-9-/_\\[\\].]+",
			},
		],

		// Avoid imports with side effects
		"import/no-unassigned-import": [
			"error",
			{
				allow: [
					"**/*.css",
					"**/*.scss",
					"**/reportUncaughtErrors",
					"regenerator-runtime/runtime", // Automatic registration
				],
			},
		],

		"import/no-extraneous-dependencies": "off", // Not worth it

		// Rules that duplicate TypeScript features
		"import/default": "off",
		"import/named": "off",
		"import/no-named-as-default": "off", // Too slow
		"import/no-named-as-default-member": "off", // It's common to use `React.memo` instead of just `memo`

		// Maybe later, opinionated
		"import/order": "off",
		"import/extensions": "off",
		"import/no-mutable-exports": "off",
	},
	overrides: [
		{
			files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
			settings: {
				"import/resolver": {
					typescript: {},
				},
				"import/ignore": [
					"react-select", // For some reason it points to a flow JS file
				],
			},
		},
	],
};
