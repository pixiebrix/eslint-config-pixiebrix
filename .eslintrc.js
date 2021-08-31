// These are rules that apply this to repo, they're not exported. Ignore.

const localConfig = require('./index.js');
localConfig.rules = {
	...localConfig.rules,
	"@typescript-eslint/no-var-requires": "off",
	"@typescript-eslint/no-require-imports": "off",
	"unicorn/prefer-module": "off",
	"filenames/match-exported": "off"
}
localConfig.settings.react.version = "16.13"; // Irrelevant for this repo

module.exports = localConfig;
