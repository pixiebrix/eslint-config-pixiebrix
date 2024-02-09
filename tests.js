/** @file These additional rules are meant for tests in order to make it stricter as well as simplify it */

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
		// Loosen types a bit to facilitate testing
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-unsafe-argument": "off",
		"@typescript-eslint/no-unsafe-member-access": "off",
		"@typescript-eslint/no-unsafe-call": "off",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-unsafe-return": "off",
		"@typescript-eslint/no-non-null-assertion": "off",

		// Common and required usage in tests
		"unicorn/no-useless-undefined": "off",

		// These 2 make the tests less readable/idiomatic
		"jest/no-conditional-expect": "off",
		"unicorn/consistent-function-scoping": "off",
	},
};
