"use strict";

module.exports = {
	extends: ["plugin:jsdoc/recommended-typescript-error"],
	plugins: ["jsdoc"],
	rules: {
		// No need to add or remove spacing
		"jsdoc/tag-lines": "off",

		// Conflicts with our usage of @since
		"jsdoc/check-values": "off",

		// Function/parameter names should be self-explanatory, descriptions are useful but not required
		"jsdoc/require-jsdoc": "off",
		"jsdoc/require-returns": "off",
		"jsdoc/require-param": "off",

		// Enable later, most objects don't follow the correct format
		"jsdoc/check-param-names": "off",

		// Add our own tags
		"jsdoc/check-tag-names": [
			"error",
			{
				definedTags: ["warning", "note", "knip", "context"],
			},
		],

		// Enable more on top of the recommendations
		"jsdoc/require-hyphen-before-param-description": ["error", "never"],
		"jsdoc/require-asterisk-prefix": "error",
		"jsdoc/check-line-alignment": "error",
		"jsdoc/check-indentation": "warn", // Can't outfix the existing errors,I'll leave it as warning
		"jsdoc/no-bad-blocks": ["error", { ignore: ["jest-environment-options"] }],
		"jsdoc/no-blank-blocks": "error",
		"jsdoc/no-blank-block-descriptions": "error",
	},
};
