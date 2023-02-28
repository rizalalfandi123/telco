import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";


// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
	const env = loadEnv(mode, process.cwd(), "");

  console.log("ss",env.VITE_API_BASE)


  return {
    plugins: [react()],
    resolve: {
			alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
		},
    clearScreen: false,
    // tauri expects a fixed port, fail if that port is not available
    server: {
      port: 1420,
      strictPort: true,
      // proxy: {
			// 	"/api": {
			// 		target: "https://api-telin.md-digilabs.com/v1",
			// 		changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
			// 	},
			// },
    },
    // to make use of `TAURI_DEBUG` and other env variables
    // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ["VITE_", "TAURI_"],
    build: {
      // Tauri supports es2021
      target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
      // don't minify for debug builds
      minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
      // produce sourcemaps for debug builds
      sourcemap: !!process.env.TAURI_DEBUG,
    },
  };
});
