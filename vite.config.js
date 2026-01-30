import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const apiUrl = env.VITE_API_URL || "https://schooldb.skillline.ru/api";
  const isDevelopment = mode === "development";

  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {},
      },
      modules: {
        generateScopedName: isDevelopment
          ? "[name]__[local]__[hash:base64:5]"
          : "[hash:base64:8]",
        hashPrefix: "prefix",
      },
    },
    postcss: {
      plugins: [],
    },
    server: {
      port: 3000,
      open: true,
      hmr: {
        overlay: true,
      },
      proxy: {
        "/api": {
          target: apiUrl, 
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      },
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    build: {
      outDir: "dist",
      sourcemap: false, 
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? "")) {
              return "assets/images/[name]-[hash][extname]";
            }
            if (/\.css$/.test(name ?? "")) {
              return "assets/css/[name]-[hash][extname]";
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? "")) {
              return "assets/fonts/[name]-[hash][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      
        manualChunks: {
          vendor: ["vue", "vue-router", "pinia"],
          axios: ["axios"],
        },
      },
    },
    optimizeDeps: {
      include: ["vue"],
    },
  };
});
