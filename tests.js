/** @file These additional rules are meant for tests in order to make it stricter as well as simplify it */

const a11yRules = Object.keys(require("eslint-plugin-jsx-a11y").rules).map(
	(rule) => [`jsx-a11y/${rule}`, "off"],
);

module.exports = {
	env: {
		node: true,
		jest: true,
	},
	plugins: ["jest", "testing-library"],
	extends: [
		"plugin:jest/recommended",
		"plugin:jest/style",
		"plugin:testing-library/react",
	],
	rules: {
		// Enable more testing rules
		"jest/prefer-expect-resolves": "error",
		"jest/expect-expect": "error",

		"@shopify/jest-no-snapshots": "warn",

		// Loosen types a bit to facilitate testing
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-unsafe-argument": "off",
		"@typescript-eslint/no-unsafe-member-access": "off",
		"@typescript-eslint/no-unsafe-call": "off",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-unsafe-return": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"react/jsx-key": "off",

		// Common and required usage in tests
		"unicorn/no-useless-undefined": "off",

		// These 2 make the tests less readable/idiomatic
		"jest/no-conditional-expect": "off",
		"unicorn/consistent-function-scoping": "off",

		// No a11y needed in tests
		...Object.fromEntries(a11yRules),
	},
};
