import Transport from "winston-transport";
import axios from "axios";

class DatadogTransport extends Transport {
	constructor(opts) {
		super(opts);
		this.site = opts.site;
		this.hostname = opts.hostname;
		this.PROXY_SERVER_URL = "http://localhost:3000/logs";
	}

	async log(info, callback) {
		setImmediate(() => {
			this.emit("logged", info);
		});

		const { source, service, message, ...rest } = info;
		const tags = Object.keys(rest)
			.map((key) => `${key}:${rest[key]}`)
			.join(",");

		axios
			.post(
				this.PROXY_SERVER_URL,
				JSON.stringify([
					{
						ddsource: source,
						ddtags: tags,
						hostname: this.hostname,
						message: message,
						service: service,
					},
				]),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then(function (response) {})
			.catch(function (error) {
				console.log(error);
			});

		callback();
	}
}

export { DatadogTransport };
