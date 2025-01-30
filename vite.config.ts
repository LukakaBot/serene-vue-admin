import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueMacros from 'unplugin-vue-macros/vite';
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import vueDevTools from 'vite-plugin-vue-devtools';
import { viteMockServe } from 'vite-plugin-mock';
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig((({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_PUBLIC_PATH,
    plugins: [
      VueMacros({
        plugins: {
          vue: vue(),
          vueJsx: vueJsx(),
        },
      }),
      UnoCSS(),
      AutoImport({
        dts: 'src/typings/auto-import.d.ts',
        imports: [
          'vue',
          'vue-router',
          'pinia',
          { 'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'] },
        ],
        resolvers: [],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        dts: 'src/typings/components.d.ts',
        resolvers: [NaiveUiResolver()],
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'svg-[name]',
      }),
      vueDevTools(),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      }),
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    server: {
      port: 9000,
      // proxy: {
      //   '/api': {
      //     target: 'http://192.168.5.148:9000',
      //     changeOrigin: true,
      //   },
      // },
    }
  };
}))
