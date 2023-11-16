import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	const config = {
		plugins: [react(), legacy(), VitePWA({ registerType: "autoUpdate" })],
		base: "/home",
	};

	if (command !== "serve") {
		config.base = "/swish/";
	}

	return config;
});
