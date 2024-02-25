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
	// NOTE: If you add more rules, add the tests to no-restricted-syntax.test.ts
];
