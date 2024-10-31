module.exports = {
	rules: {
		// It helps us identify the chunks generated/loaded in the browser
		"import-x/dynamic-import-chunkname": [
			"error",
			{
				webpackChunknameFormat: String.raw`[a-zA-Z0-57-9-/_\[\].]+`,
			},
		],

		// Avoid imports with side effects
		"import-x/no-unassigned-import": [
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

		"import-x/no-extraneous-dependencies": "off", // Not worth it

		// Rules that duplicate TypeScript features
		"import-x/default": "off",
		"import-x/named": "off",
		"import-x/no-named-as-default": "off", // Too slow
		"import-x/no-named-as-default-member": "off", // It's common to use `React.memo` instead of just `memo`

		// Maybe later, opinionated
		"import-x/order": "off",
		"import-x/extensions": "off",
		"import-x/no-mutable-exports": "off",
	},
	overrides: [
		{
			files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
			settings: {
				"import-x/resolver": {
					typescript: {},
				},
				"import-x/ignore": [
					"react-select", // For some reason it points to a flow JS file
				],
			},
		},
	],
};
