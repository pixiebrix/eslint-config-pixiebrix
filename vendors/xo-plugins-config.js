"use strict";

// Vendored from https://github.com/xojs/xo/blob/7da6311abcd069bea561a9be0f9b7aa220784a34/config/plugins.cjs
// Changes:
// - Drop eslint-config-xo repetitions
// - Drop AVA
// - Restore promise plugin
// - Drop non-rule / non-plugin settings
// - replace eslint-plugin-node with its successor, eslint-plugin-n

module.exports = {
	plugins: [
		"no-use-extend-native",
		"unicorn",
		"promise",
		"import-x",
		"n",
		"@eslint-community/eslint-comments",
	],
	rules: {
		"no-use-extend-native/no-use-extend-native": "error",

		"promise/param-names": "error",
		"promise/no-return-wrap": [
			"error",
			{
				allowReject: true,
			},
		],
		"promise/no-new-statics": "error",
		"promise/no-return-in-finally": "error",
		"promise/valid-params": "error",
		"promise/prefer-await-to-then": "error",

		"import-x/default": "error",
		"import-x/export": "error",
		"import-x/extensions": [
			"error",
			"always",
			{
				ignorePackages: true,
			},
		],
		"import-x/first": "error",

		// Enabled, but disabled on TypeScript (https://github.com/xojs/xo/issues/576)
		"import-x/named": "error",

		"import-x/namespace": [
			"error",
			{
				allowComputed: true,
			},
		],
		"import-x/no-absolute-path": "error",
		"import-x/no-anonymous-default-export": "error",
		"import-x/no-named-default": "error",
		"import-x/no-webpack-loader-syntax": "error",
		"import-x/no-self-import": "error",
		"import-x/no-cycle": [
			"error",
			{
				ignoreExternal: true,
			},
		],
		"import-x/no-useless-path-segments": "error",
		"import-x/newline-after-import": "error",
		"import-x/no-amd": "error",
		"import-x/no-duplicates": "error",

		"import-x/no-extraneous-dependencies": "error",
		"import-x/no-mutable-exports": "error",
		"import-x/no-named-as-default-member": "error",
		"import-x/no-named-as-default": "error",

		"import-x/order": "error",
		"import-x/no-unassigned-import": [
			"error",
			{
				allow: [
					"@babel/polyfill",
					"**/register",
					"**/register.*",
					"**/register/**",
					"**/register/**.*",
					"**/*.css",
					"**/*.scss",
					"**/*.sass",
					"**/*.less",
				],
			},
		],

		"n/no-unpublished-bin": "error",

		// We have this enabled in addition to `import-x/extensions` as this one has an auto-fix.
		"n/file-extension-in-import": [
			"error",
			"always",
			{
				// TypeScript doesn't yet support using extensions and fails with error TS2691.
				".ts": "never",
				".tsx": "never",
			},
		],
		"n/no-mixed-requires": [
			"error",
			{
				grouping: true,
				allowCall: true,
			},
		],
		"n/no-new-require": "error",
		"n/no-path-concat": "error",

		"n/process-exit-as-throw": "error",

		"n/no-deprecated-api": "error",
		"n/prefer-global/buffer": ["error", "never"],
		"n/prefer-global/console": ["error", "always"],
		"n/prefer-global/process": ["error", "never"],
		"n/prefer-global/text-decoder": ["error", "always"],
		"n/prefer-global/text-encoder": ["error", "always"],
		"n/prefer-global/url-search-params": ["error", "always"],
		"n/prefer-global/url": ["error", "always"],
		"n/prefer-promises/dns": "error",
		"n/prefer-promises/fs": "error",
		"@eslint-community/eslint-comments/disable-enable-pair": [
			"error",
			{
				allowWholeFile: true,
			},
		],
		"@eslint-community/eslint-comments/no-aggregating-enable": "error",
		"@eslint-community/eslint-comments/no-duplicate-disable": "error",
	},
};
