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

// `npm run lint:fast` will skip the (slow) import/* rules
// Useful if you're trying to iterate fixes over other rules
if (process.env.ESLINT_NO_IMPORTS) {
	const importRules = Object.keys(require("eslint-plugin-import").rules);
	for (const ruleName of importRules) {
		module.exports.rules[`import/${ruleName}`] = "off";
	}
}
