const { createLogger, format, transports } = require("winston");
const { combine, timestamp, metadata, prettyPrint, colorize, json } = format;

export default logger = createLogger({
	exitOnError: true,
	transports: [
		new transports.Console({
			level: "debug",
			format: combine(timestamp(), metadata(), prettyPrint()),
		}),
		new transports.File({
			level: "debug",
			filename:
				"/Users/ansley.miller/Library/Mobile Documents/iCloud~md~obsidian/Documents/testing/.obsidian/plugins/ObsidianTemplateForms/log/all.log",
			format: combine(timestamp(), json(), metadata()),
		}),
	],
});
