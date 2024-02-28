"use strict";

const xoTypeScriptConfig = require("eslint-config-xo-typescript");

function customize(config, rule, customizer) {
	const [type, ruleConfig] = config.rules[rule];
	// Spread shallow-clones the object
	const newRuleConfig = { ...ruleConfig };
	customizer(newRuleConfig);
	return {
		[rule]: [type, newRuleConfig],
	};
}

const config = {
	env: {
		browser: true,
	},
	settings: {
		"import/resolver": {
			typescript: {},
		},
		"import/ignore": [
			"react-select", // For some reason it points to a flow JS file
		],
		react: {
			version: "detect",
		},
	},
	ignorePatterns: [".idea", "dist", "**/__mocks__/**"],
	plugins: ["filenames", "jsx-a11y"],
	extends: [
		"./xo-plugins-config.js",
		"xo", // Full config: https://github.com/xojs/eslint-config-xo/blob/main/index.js
		"xo-typescript", // Full config: https://github.com/xojs/eslint-config-xo-typescript/blob/main/index.js
		"prettier", // Disable style-related rules
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:security/recommended-legacy",
		"plugin:unicorn/recommended", // Full config: https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/configs/recommended.js
		"plugin:jsx-a11y/recommended", // Full config https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/src/index.js#L55
		/**************************************************************
		 * Only add test rules and plugins to the "./tests.js" config *
		 **************************************************************/
	],
	rules: {
		// Enable extra rules

		"import/dynamic-import-chunkname": [
			"error",
			{
				webpackChunknameFormat: "[a-zA-Z0-57-9-/_\\[\\].]+",
			},
		],

		"no-restricted-imports": ["error", require("./no-restricted-imports")],

		"no-restricted-syntax": ["error", ...require("./no-restricted-syntax")],

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

		// TODO: Drop/replace `allowExpressions` after https://github.com/jsx-eslint/eslint-plugin-react/issues/2584
		// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md#allowexpressions
		"react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],

		// Customize some rules
		quotes: ["error", "double", { avoidEscape: true }], // Matches Prettier, but also replaces backticks

		...customize(
			xoTypeScriptConfig,
			"@typescript-eslint/ban-types",
			(config) => {
				delete config.types.null;
			}
		),

		// Reason: https://github.com/pixiebrix/pixiebrix-extension/pull/7703
		"@typescript-eslint/restrict-template-expressions": [
			"error",
			{ allowNever: true, allowNumber: true },
		],

		// We want to have a default case to check for `never`
		"@typescript-eslint/switch-exhaustiveness-check": [
			"error",
			{
				allowDefaultCaseForExhaustiveSwitch: true,
				requireDefaultForNonUnion: true,
			},
		],

		"@typescript-eslint/no-non-null-assertion": "error",
		"@typescript-eslint/no-explicit-any": [
			"error",
			{
				fixToUnknown: true,
				ignoreRestArgs: true,
			},
		],

		"unicorn/prefer-export-from": [
			"error",
			{
				ignoreUsedVariables: true,
			},
		],

		"unicorn/prevent-abbreviations": [
			"error",
			{
				replacements: {
					acc: false,
					arg: false,
					args: false,
					db: false,
					dev: false,
					doc: false,
					docs: false,
					env: false,
					err: false,
					ev: false,
					evt: false,
					ext: false,
					exts: false,
					$el: {
						$elements: true,
					},
					$elt: {
						$elements: true,
					},
					$element: {
						$elements: true,
					},
					fn: false,
					func: {
						fn: true,
						function: false,
					},
					i: false,
					j: false,
					mod: false,
					num: false,
					obj: false,
					param: false,
					params: false,
					prev: false,
					prod: false,
					prop: false,
					props: false,
					ref: false,
					refs: false,
					str: false,
					var: false,
					vars: false,
				},
				ignore: ["semVer", "SemVer"],
			},
		],
		"unicorn/filename-case": [
			"error",
			{
				cases: {
					camelCase: true,
					pascalCase: true,
				},
			},
		],
		eqeqeq: ["error", "always", { null: "never" }],

		// Disable recommended rules
		"no-eq-null": "off", // `eqeqeq` covers it: https://github.com/pixiebrix/pixiebrix-extension/pull/887#pullrequestreview-711873690
		"unicorn/no-null": "off", // We don't do that here
		"react/prop-types": "off", // We don't do that here
		"no-warning-comments": "off", // Only useful if there aren't hundreds of other real warnings
		"security/detect-non-literal-fs-filename": "off", // 100% false positives, we never use the `fs` module
		"unicorn/no-nested-ternary": "off", // Sometimes it conflicts with Prettier
		"unicorn/prefer-set-has": "off", // Not always worth the extra code
		"unicorn/prefer-top-level-await": "off", // No advantage in browsers
		"import/no-extraneous-dependencies": "off", // Not worth it
		"@typescript-eslint/triple-slash-reference": "off", // No alternative sometimes
		"@typescript-eslint/consistent-type-definitions": "off", // `type` cannot be used to extend globals
		"@typescript-eslint/no-dynamic-delete": "off", // Already covered by `security/detect-object-injection`

		// Rules that duplicate TypeScript features
		"import/default": "off",
		"import/named": "off",
		"import/no-named-as-default": "off", // Too slow
		"import/no-named-as-default-member": "off", // It's common to use `React.memo` instead of just `memo`
		"@typescript-eslint/consistent-type-assertions": "off", // Our current typing has too many `unknowns` for this to be applicable https://github.com/typescript-eslint/typescript-eslint/issues/4462

		// Disable rule until we find a better config https://github.com/pixiebrix/eslint-config-pixiebrix/issues/5
		"@typescript-eslint/naming-convention": "off",

		// Requires strictNullChecks
		"@typescript-eslint/prefer-nullish-coalescing": "off",

		// Maybe later, opinionated
		"unicorn/prefer-ternary": "off",
		"@typescript-eslint/member-ordering": "off",
		"@typescript-eslint/no-empty-function": "off",

		"import/order": "off",
		"import/extensions": "off",
		"import/no-mutable-exports": "off",
		"node/file-extension-in-import": "off",
		"node/prefer-global/process": "off", // `process.env` is required by webpack
		"node/prefer-global/buffer": "off",

		"@typescript-eslint/no-use-before-define": [
			"error",
			{
				// Disabling functions -- functions are hoisted and not a risk
				// https://eslint.org/docs/latest/rules/no-use-before-define#options
				functions: false,
				// https://typescript-eslint.io/rules/no-use-before-define/#options
				ignoreTypeReferences: false,
			},
		],
	},
	overrides: [
		{
			// JS files shouldn't have TypeScript rules, but it's bothersome to separate them properly
			files: ["**/*.js"],
			rules: {
				"@typescript-eslint/no-unsafe-argument": "off",
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/no-unsafe-call": "off",
				"@typescript-eslint/no-unsafe-member-access": "off",
				"@typescript-eslint/no-unsafe-return": "off",
			},
		},
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
