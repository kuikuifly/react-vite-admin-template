import * as path from 'path';
import { defineConfig, loadEnv, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default defineConfig(({ command, mode }) => {
  const root = process.cwd();

  const env = loadEnv(mode, root);
  const { VITE_APP_PORT } = env;

  const isBuild = command === 'build';

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, './src/assets/iconsvg')],
      symbolId: 'icon-[name]',
    }),
  ];

  return {
    root,
    server: {
      host: true,
      cors: true,
      port: Number(VITE_APP_PORT || 3000),
      // /*
      proxy: {
        '/api': {
          // 用于开发环境下的转发请求
          target: 'http://localhost:8800',
          changeOrigin: true,
        },
      },
      // */
    },
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: `${path.resolve(__dirname, './node_modules')}/`,
        },
        {
          find: /@\//,
          replacement: `${path.resolve(__dirname, './src')}/`,
        },
      ],
    },
    plugins: vitePlugins,
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  };
});
