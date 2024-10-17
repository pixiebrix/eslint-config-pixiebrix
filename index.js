"use strict";

const config = {
	env: {
		browser: true,
	},
	ignorePatterns: [".idea", "dist", "**/__mocks__/**"],
	plugins: ["filenames", "jsx-a11y", "@shopify"],
	extends: [
		"xo", // Full config: https://github.com/xojs/eslint-config-xo/blob/main/index.js
		"./vendors/xo-plugins-config.js", // Vendored from xojs/xo package, it must be here as a baseline

		"plugin:security/recommended-legacy",
		"plugin:jsx-a11y/recommended", // Full config https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/src/index.js#L55

		// Once some plugin configuration becomes "too large" it's extracted to its own file
		"./plugins/jsdoc.js",
		"./plugins/react.js",
		"./plugins/import.js",
		"./plugins/typescript.js",
		"./plugins/unicorn.js",

		// Must be last. Disable style-related rules
		"prettier",

		/**************************************************************
		 * Only add test rules and plugins to the "./tests.js" config *
		 **************************************************************/
	],
	rules: {
		// Enable extra rules
		"@shopify/react-hooks-strict-return": "error",
		"@shopify/prefer-module-scope-constants": "error",

		"no-restricted-imports": ["error", require("./no-restricted-imports")],
		"no-restricted-syntax": ["error", ...require("./no-restricted-syntax")],
		"no-mixed-operators": [
			"error",
			{
				// Customize the defaults to force being explicit about use of null-coalescing operator because its precedence
				// is unintuitive. See: https://eslint.org/docs/rules/no-mixed-operators
				groups: [
					// Conflicts with Prettier: https://github.com/prettier/prettier/issues/3968
					// ["+", "-", "*", "/", "%", "**", "??"],
					["&", "|", "^", "~", "<<", ">>", ">>>", "??"],
					["==", "!=", "===", "!==", ">", ">=", "<", "<=", "??"],
					["&&", "||", "??"],
					["in", "instanceof", "??"],
				],
			},
		],

		// Customize some rules
		quotes: ["error", "double", { avoidEscape: true }], // Matches Prettier, but also replaces backticks

		eqeqeq: ["error", "always", { null: "never" }],

		// Override default Prettier rule: https://github.com/prettier/eslint-config-prettier/blob/5687e7de69ac132f053b4bc5474d5963aa3bf6d6/README.md#curly
		curly: ["error", "all"],

		// Disable recommended rules
		"no-eq-null": "off", // `eqeqeq` covers it: https://github.com/pixiebrix/pixiebrix-extension/pull/887#pullrequestreview-711873690
		"no-warning-comments": "off", // Only useful if there aren't hundreds of other real warnings
		"security/detect-non-literal-fs-filename": "off", // 100% false positives, we never use the `fs` module

		"n/file-extension-in-import": "off",
		"n/prefer-global/process": "off", // `process.env` is required by webpack
		"n/prefer-global/buffer": "off",
	},
	overrides: [
		{
			files: ["**/*.tsx", "**/use*.ts"],
			excludedFiles: ["*.test.tsx", "*.stories.tsx"],
			rules: {
				"filenames/match-exported": "error",
			},
		},
		{
			files: ["*.stories.tsx"],
			extends: ["plugin:storybook/recommended"],
			rules: {
				"unicorn/filename-case": "off",
				"unicorn/no-useless-spread": "off", // Clashes with getDefaultMiddleware().concat
				"import/no-anonymous-default-export": "off",
			},
		},
		/**************************************************************
		 * Only add test rules and plugins to the "./tests.js" config *
		 **************************************************************/
	],
};

module.exports = config;
