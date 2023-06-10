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
import { SettingsTab } from "./components/settingsTab";
import { CreateTemplateFormButtonModal } from "./components/modal";

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
				log.info("editorCallback", {
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
