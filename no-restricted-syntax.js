module.exports = [
	// NOTE: If you add more rules, add the tests to no-restricted-syntax.test.ts

	{
		selector:
			"TSTypeReference[typeName.name='Record'][typeParameters.params.0.type=TSStringKeyword][typeParameters.params.1.type=TSUnknownKeyword]",
		message: "Use `UnknownObject` instead of `Record<string, unknown>`",
	},
	{
		selector: "CallExpression[callee.property.name='allSettled']",
		message:
			'For safety and convenience, use this instead: import { allSettled } from "@/utils/promiseUtils";',
	},
	{
		message:
			"Bootstrap columns should not be used if there's a single column. Use a plain `div` or drop the wrapper altogether if not needed. You might also consider using one of the classes 'max-550', 'max-750', or 'max-950' to limit the width of the body.",
		selector:
			"JSXElement[openingElement.name.name='Row'] > JSXText:first-child + JSXElement:nth-last-child(2)",
	},
	{
		message:
			"Use the `uuid` module instead because crypto.randomUUID is not available in http: contexts",
		selector: 'MemberExpression > Identifier[name="randomUUID"]',
	},
	{
		message: "Use `jest.mocked(fn)` instead of `fn as jest.Mock`.",
		selector: "TSAsExpression TSQualifiedName[right.name='Mock']",
	},
	{
		message: "Use `jest.mocked(fn)` instead of `fn as jest.MockedFunction`.",
		selector: "TSAsExpression TSQualifiedName[right.name='MockedFunction']",
	},
	{
		message:
			"Unless the code is using .then(), calling `.mockResolvedValue(undefined)` is the same as leaving it out",
		selector:
			"CallExpression[callee.property.name='mockResolvedValue'][arguments.0.name='undefined'][arguments.0.type='Identifier']",
	},
	{
		message: "Use this instead: import cx from 'classnames'",
		selector:
			"ImportDeclaration[source.value=classnames] ImportDefaultSpecifier[local.name!=/cx/]",
	},
	{
		message:
			"Instead of `<div onClick/>`, use <UnstyledButton/> (`button` element) or  <ClickableElement/> (accessible `div` element)",
		selector:
			"JSXOpeningElement[name.name='div'][attributes.0.name.name='onClick']",
	},
	{
		message:
		  "Prefer importing `getSelectionRange()` helper or check `selection.rangeCount` first: https://github.com/pixiebrix/pixiebrix-extension/pull/7989",
		selector: "CallExpression[callee.property.name='getRangeAt']",
	},
	{
	  message:
		"Use the chrome.* APIs (browser.* is now only used for for messaging)",
	  selector:
		"MemberExpression[object.object.name='browser']:not(:has(Identifier[name=/runtime|tabs/]):has(Identifier[name=/Message/]))",
	},
	{
	  message:
		"Use the browser.* APIs for messaging (chrome.* for everything else)",
	  selector:
		"MemberExpression[object.object.name='chrome']:has(Identifier[name=/runtime|tabs/]):has(Identifier[name=/Message/])",
	},

	// NOTE: If you add more rules, add the tests to no-restricted-syntax.test.ts
];
