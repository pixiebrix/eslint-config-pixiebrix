# eslint-config-pixiebrix

> ESLint [shareable config](https://eslint.org/docs/developer-guide/shareable-configs.html) for [PixieBrix](https://github.com/pixiebrix)

## Install

```
$ npm install --save-dev eslint-config-pixiebrix
```

## Usage

Add some ESLint config to your `package.json`:

```json
{
	"name": "my-pixiebrix-project",
	"eslintConfig": {
		"extends": "pixiebrix"
	}
}
```

Or to `.eslintrc`:

```json
{
	"extends": "pixiebrix"
}
```

## npm publishing

Collaborators can publish a new version of what's on main [via "workflow_dispatch"](https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/) under [Actions » Publish](https://github.com/pixiebrix/eslint-config-pixiebrix/actions/workflows/npm-publish.yml)
