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
		{
			group: ["react-shadow/emotion"],
			message:
				'Use this instead: import EmotionShadowRoot from "@/components/EmotionShadowRoot"',
		},
	],
};
