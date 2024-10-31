/** @file These additional rules are meant for development code in order to simplify it */

module.exports.rules = {
	// Allow CJS because not all tooling is ready
	"@typescript-eslint/no-require-imports": "off",
	"@typescript-eslint/no-var-requires": "off",
	"unicorn/prefer-module": "off",

	// Loosen types a bit to facilitate testing
	"@typescript-eslint/no-explicit-any": "off",
	"@typescript-eslint/no-unsafe-argument": "off",
	"@typescript-eslint/no-non-null-assertion": "off",

	// The webpack/testing files only run on the CI server, so don't need to watch for these:
	"security/detect-object-injection": "off",
	"security/detect-child-process": "off",
	"security/detect-unsafe-regex": "off",

	// It's a Webpack optimization, not necessary here
	"import-x/dynamic-import-chunkname": "off",
};
