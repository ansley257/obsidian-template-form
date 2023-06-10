const { createLogger, format, transports } = require("winston");
const { DatadogTransport } = require("./ddTransport");
const { combine, timestamp, metadata, prettyPrint, colorize, json } = format;
import DatadogWinston from "datadog-winston";
import os from "os";

const basePath = app.vault.adapter.basePath;

const ddTransport = new DatadogTransport({
	level: "debug",
	site: process.env.DD_SITE,
	hostname: process.env.DD_HOSTNAME,
});

function formatTags(meta) {
	// Format your metadata into an array of tags
	return Object.entries(meta)
		.map(([key, value]) => `${key}:${value}`)
		.join(",");
}

export default logger = createLogger({
	exitOnError: true,
	defaultMeta: {
		source: "nodejs",
		service: "template-form",
		env: "development",
		version: "0.0.1",
	},
	transports: [
		new transports.Console({
			level: "debug",
			format: combine(timestamp(), prettyPrint(), metadata()),
		}),
		new transports.File({
			level: "debug",
			filename: `${basePath}/.obsidian/plugins/ObsidianTemplateForms/log/all.log`,
			format: combine(timestamp(), json(), metadata()),
		}),
		// ddTransport,
		new DatadogWinston({
			apiKey: process.env.DD_API_KEY,
			hostname: process.env.DD_HOSTNAME,
			service: "template-form",
			ddsource: "nodejs",
			ddtags: formatTags({ env: "development", version: "0.0.1" }),
		}),
	],
});
