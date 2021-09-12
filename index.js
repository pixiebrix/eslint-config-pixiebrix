module.exports = {
	env: {
		browser: true,
	},
	settings: {
		'import/resolver': {
			typescript: {},
		},
		'import/ignore': [
			'react-select', // For some reason it points to a flow JS file
		],
		react: {
			version: 'detect',
		},
	},
	plugins: ['filenames', 'jsx-a11y'],
	extends: [
		'xo', // Full config: https://github.com/xojs/eslint-config-xo/blob/main/index.js
		'xo-typescript', // Full config: https://github.com/xojs/eslint-config-xo-typescript/blob/main/index.js
		'prettier', // Disable style-related rules
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:security/recommended',
		'plugin:unicorn/recommended',
		'plugin:jsx-a11y/recommended',
	],
	rules: {
		// Enable extra rules
		'filenames/match-exported': 'error',
		'no-restricted-imports': [
			'error',
			{
				// Documentation: https://eslint.org/docs/rules/no-restricted-imports#options
				patterns: [
					{
						group: ['*/__mocks__/*'],
						message: 'Mocks should not be imported directly, they’re automatically picked up by tools.',
					},
					{
						group: ['lodash/*'],
						message: 'You can import "lodash" instead of "lodash/*."',
					},
					{
						group: ['react-bootstrap/*', '!react-bootstrap/types'],
						message: 'You can import "react-bootstrap" instead of "react-bootstrap/*".'
					},
					{
						group: ['../*'],
						message: 'Use root-based imports (`import "@/something"`) instead of relative imports.'
					}
				],
			},
		],

		'no-mixed-operators': [
			'error',
			{
				// Customize the defaults to force being explicit about use of null-coalescing operator because its precedence
				// is unintuitive. See: https://eslint.org/docs/rules/no-mixed-operators
				groups: [
					// Conflicts with Prettier: https://github.com/prettier/prettier/issues/3968
					// ["+", "-", "*", "/", "%", "**", "??"],
					['&', '|', '^', '~', '<<', '>>', '>>>', '??'],
					['==', '!=', '===', '!==', '>', '>=', '<', '<=', '??'],
					['&&', '||', '??'],
					['in', 'instanceof', '??'],
				],
			},
		],

		// Customize some rules
		'import/no-unresolved': [
			'error',
			{
				ignore: [
					'json-schema', // @types-only package
				],
			},
		],
		'unicorn/prevent-abbreviations': [
			'error',
			{
				extendDefaultReplacements: false,
				replacements: {
					err: {
						error: true,
					},
				},
			},
		],
		'unicorn/filename-case': [
			'error',
			{
				cases: {
					camelCase: true,
					pascalCase: true,
				},
			},
		],
		// Smart allows for != null. See: https://github.com/pixiebrix/pixiebrix-extension/pull/887#pullrequestreview-711873690
		eqeqeq: ['error', 'smart'],

		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'variable',
				modifiers: ['const', 'exported'],
				types: ['boolean', 'string', 'number'],
				format: ['UPPER_CASE'],
			},
		],

		// Disable recommended rules
		// It's fine because eqeqeq covers it. See https://github.com/pixiebrix/pixiebrix-extension/pull/887#pullrequestreview-711873690
		'no-eq-null': 'off',
		'import/named': 'off', // TypeScript does this natively
		'react/prop-types': 'off',
		'unicorn/prefer-node-protocol': 'off', // Not fully supported by TS
		'unicorn/prefer-set-has': 'off', // Not always worth the extra code
		'unicorn/require-post-message-target-origin': 'off', // Incompatible https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1396
		'no-warning-comments': 'off', // Only useful if there aren't hundreds of other real warnings

		// Too strict for now
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',

		// Maybe later, opinionated
		'unicorn/no-null': 'off',
		'unicorn/prefer-ternary': 'off',
		'@typescript-eslint/member-ordering': 'off',
		'@typescript-eslint/no-empty-function': 'off',
	}
};

