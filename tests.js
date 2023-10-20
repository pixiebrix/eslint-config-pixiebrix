/** @file These additional rules are meant for tests in order to make it stricter as well as simplify it */

module.exports = {
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
		"@typescript-eslint/no-non-null-assertion": "off",

		// Tests can import any file
		"import/no-restricted-paths": "off",

		// Common and required usage in tests
		"unicorn/no-useless-undefined": "off",

		// Disable test rules we don't like
		"jest/no-export": "off",
		"jest/no-conditional-expect": "off",
	},
};
