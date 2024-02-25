module.exports = {
	// Documentation: https://eslint.org/docs/rules/no-restricted-imports#options
	paths: [
		{
			name: "lodash",
			importNames: ["lowerCase"],
			message: "Use the native String.toLowerCase method instead.",
		},
	],
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
			group: ["immer/*"],
			importNames: ["WritableDraft"],
			message: 'Use this instead: import { type Draft } from "immer"',
		},
		{
			group: ["react-spinners"],
			message:
				"Use the local <Loader/> component instead, it's already centered.",
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
		{
			group: ["formik"],
			importNames: ["Form", "Formik"],
			message: 'Use this instead: import "@/components/form/Form"',
		},
		{
			group: ["react-bootstrap"],
			importNames: ["Form"],
			message: 'Use this instead: import "@/components/form/Form"',
		},
		{
			group: ["webext-detect-page"],
			importNames: ["isDevToolsPage"],
			message:
				'Use this instead: import { isPageEditor } from "@/utils/expectContext";',
		},
	],
};
