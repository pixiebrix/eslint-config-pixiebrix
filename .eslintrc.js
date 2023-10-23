// These are rules that apply this to repo, they're not exported. Ignore.
module.exports = {
	extends: ["./index.js", "./development.js"],
	rules: {
		"filenames/match-exported": "off",
	},
	settings: {
		react: {
			version: "16.13", // Irrelevant for this repo
		},
		jest: { version: "26" }, // Irrelevant for this repo
	},
};
