// These are rules that apply this to repo, they're not exported. Ignore.

const localConfig = require("./server.js");

localConfig.rules = {
	...localConfig.rules,
	"filenames/match-exported": "off",
};
localConfig.settings.react.version = "16.13"; // Irrelevant for this repo
localConfig.settings.jest = { version: "26" }; // Irrelevant for this repo

module.exports = localConfig;
