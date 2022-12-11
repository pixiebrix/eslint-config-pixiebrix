module.exports.extends = ["plugin:jest/recommended"];

module.exports.rules = {
	// Allow CJS because not all tooling is ready
	"@typescript-eslint/no-require-imports": "off",
	"@typescript-eslint/no-var-requires": "off",
	"unicorn/prefer-module": "off",

	// Loosen types a bit to facilitate testing
	"@typescript-eslint/no-explicit-any": "off",

	// Tests can import any file
	"import/no-restricted-paths": "off",

	// The webpack/testing files only run on the CI server, so don't need to watch for these:
	"security/detect-object-injection": "off",
	"security/detect-child-process": "off",
	"security/detect-unsafe-regex": "off",

	"jest/no-conditional-expect": "off",
	"unicorn/consistent-function-scoping": "off",

	// Common and required usage in tests
	"unicorn/no-useless-undefined": "off",

	// It's a Webpack optimization, not necessary here
	"import/dynamic-import-chunkname": "off",
};
