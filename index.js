const basePath = app.vault.adapter.basePath;
import * as dotenv from "dotenv";
dotenv.config({
	path: `${basePath}/.obsidian/plugins/ObsidianTemplateForms/.env`,
	debug: false,
});

import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";

import logger from "./log/logger";

log = logger.child({ module: "index.js" });

const DEFAULT_SETTINGS = {
	mySetting: "default",
};

export default class MyPlugin extends Plugin {
	async onload() {
		log.debug("loading plugin");
		await this.loadSettings();
		log.debug("loaded settings");

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: "add-template-form-button",
			name: "Add Template Form Button",
			editorCallback: (editor, view) => {
				log.debug("editorCallback", {
					source: "add-template-form-button",
				});
			},
		});
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText("Woah!");
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	constructor(app, plugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "Settings for my awesome plugin." });

		new Setting(containerEl)
			.setName("Setting #1")
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder("Enter your secret")
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						log.debug("Secret: " + value);
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
