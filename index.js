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

const contexts = [
	"background",
	"contentScript",
	"devTools",
	"options",
	"actionPanel",
	"pageScript",
];

const restrictedZones = [];
for (const exporter of contexts) {
	for (const importer of contexts) {
		if (exporter !== importer) {
			restrictedZones.push({
				target: `./src/${importer}/**/*`,
				from: `./src/${exporter}`,
				except: [`../${exporter}/messenger/api.ts`],
			});
		}
	}
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
	plugins: ["filenames", "jsx-a11y"],
	extends: [
		"./xoPluginsConfig.js",
		"xo", // Full config: https://github.com/xojs/eslint-config-xo/blob/main/index.js
		"xo-typescript", // Full config: https://github.com/xojs/eslint-config-xo-typescript/blob/main/index.js
		"prettier", // Disable style-related rules
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:security/recommended",
		"plugin:unicorn/recommended",
		"plugin:jsx-a11y/recommended",
	],
	rules: {
		// Enable extra rules
		"filenames/match-exported": "error",

		"import/dynamic-import-chunkname": [
			"error",
			{
				webpackChunknameFormat: "[a-zA-Z0-57-9-/_\\[\\].]+",
			},
		],
		"import/no-restricted-paths": [
			"warn",
			{
				zones: restrictedZones,
			},
		],

		"no-restricted-imports": [
			"error",
			{
				// Documentation: https://eslint.org/docs/rules/no-restricted-imports#options
				patterns: [
					{
						group: ["*/__mocks__/*"],
						message:
							"Mocks should not be imported directly, they’re automatically picked up where needed.",
					},
					{
						group: ["lodash/*"],
						message: 'You can import "lodash" instead of "lodash/*".',
					},
					{
						group: ["react-spinners"],
						message:
							'You can import the specific "react-spinners/loader" instead of just "react-spinners".',
					},
					{
						group: ["react-bootstrap/*", "!react-bootstrap/types"],
						message:
							'You can import "react-bootstrap" instead of "react-bootstrap/*".',
					},
					{
						group: ["../*"],
						message:
							'Use root-based imports (`import "@/something"`) instead of relative imports.',
					},
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

		// Customize some rules
		quotes: ["error", "double", { avoidEscape: true }], // Matches Prettier, but also replaces backticks

		...customize(
			xoTypeScriptConfig,
			"@typescript-eslint/ban-types",
			(config) => {
				delete config.types.null;
			}
		),
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
					fn: false,
					func: {
						fn: true,
						function: false,
					},
					i: false,
					j: false,
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
		// Smart allows for != null. See: https://github.com/pixiebrix/pixiebrix-extension/pull/887#pullrequestreview-711873690
		eqeqeq: ["error", "smart"],

		// Disable recommended rules
		// It's fine because eqeqeq covers it. See https://github.com/pixiebrix/pixiebrix-extension/pull/887#pullrequestreview-711873690
		"no-eq-null": "off",
		"unicorn/no-nested-ternary": "off", // Sometimes it conflicts with Prettier
		"import/no-unresolved": "off", // TypeScript does this natively
		"react/prop-types": "off",
		"unicorn/prefer-node-protocol": "off", // Not fully supported by TS
		"unicorn/prefer-set-has": "off", // Not always worth the extra code
		"unicorn/require-post-message-target-origin": "off", // Incompatible https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1396
		"no-warning-comments": "off", // Only useful if there aren't hundreds of other real warnings
		"@typescript-eslint/no-implicit-any-catch": "off", // Already covered by tsconfig
		"import/no-cycle": "off", // Unreasonably slow (90 sec lint -> 5 minutes) https://github.com/pixiebrix/pixiebrix-extension/issues/1080
		"import/no-mutable-exports": "off", // They're fine
		"node/prefer-global/process": "off", // `process.env` is required by webpack
		"eslint-comments/no-unused-disable": "off", // Seems buggy with "next-line"

		// Too strict for now
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-unsafe-member-access": "off",
		"@typescript-eslint/no-unsafe-return": "off",
		"@typescript-eslint/no-unsafe-call": "off",

		// Maybe later, opinionated
		"unicorn/no-null": "off",
		"unicorn/prefer-ternary": "off",
		"@typescript-eslint/member-ordering": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/naming-convention": "off", // https://github.com/pixiebrix/eslint-config-pixiebrix/issues/5
	},
	overrides: [], // Used below
};

config.overrides.push({
	files: ["src/*"],
	rules: {
		"no-restricted-imports": [
			"error",
			{
				// Documentation: https://eslint.org/docs/rules/no-restricted-imports#options
				patterns: [
					// Extend the existing patterns
					...config.rules["no-restricted-imports"][1].patterns,
					{
						group: ["./*"],
						message:
							'Use root-based imports (`import "@/something"`) instead of relative imports.',
					},
				],
			},
		],
	},
});

if (process.env.ESLINT_NO_IMPORTS) {
	for (const key of Object.keys(config.rules)) {
		if (key.startsWith("import/")) {
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete config.rules[key];
		}
	}

	const list = new Set(config.extends);
	for (const plugin of list) {
		if (plugin.startsWith("plugin:import/")) {
			list.delete(plugin);
		}
	}

	config.extends = [...list];
}

module.exports = config;
