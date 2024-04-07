"use strict";

function customize(config, rule, customizer) {
	const [type, ruleConfig] = config.rules[rule];
	// Spread shallow-clones the object
	const newRuleConfig = { ...ruleConfig };
	customizer(newRuleConfig);
	return {
		[rule]: [type, newRuleConfig],
	};
}

const xoTypeScriptConfig = require("eslint-config-xo-typescript");

module.exports = {
	overrides: [
		{
			extends: [
				"xo-typescript", // Full config: https://github.com/xojs/eslint-config-xo-typescript/blob/main/index.js

				// Must be last. Disable style-related rules in the xo-typescript config
				"prettier",
			],
			files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
			rules: {
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

				// Disable recommended rules
				"@typescript-eslint/triple-slash-reference": "off", // No alternative sometimes
				"@typescript-eslint/consistent-type-definitions": "off", // `type` cannot be used to extend globals
				"@typescript-eslint/no-dynamic-delete": "off", // Already covered by `security/detect-object-injection`
				"@typescript-eslint/consistent-type-assertions": "off", // Our current typing has too many `unknowns` for this to be applicable https://github.com/typescript-eslint/typescript-eslint/issues/4462

				// Disable rule until we find a better config https://github.com/pixiebrix/eslint-config-pixiebrix/issues/5
				"@typescript-eslint/naming-convention": "off",

				// Requires strictNullChecks
				"@typescript-eslint/prefer-nullish-coalescing": "off",

				// Maybe later, opinionated
				"unicorn/prefer-ternary": "off",
				"@typescript-eslint/member-ordering": "off",
				"@typescript-eslint/no-empty-function": "off",
			},
		},
	],
};
