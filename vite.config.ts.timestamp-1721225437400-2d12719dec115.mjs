// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/code/naive-admin-template/node_modules/.pnpm/vite@5.3.3_@types+node@20.14.10_sass@1.77.7/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/code/naive-admin-template/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.3.3_vue@3.4.31/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import UnoCSS from "file:///D:/code/naive-admin-template/node_modules/.pnpm/unocss@0.61.3_postcss@8.4.39_vite@5.3.3/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///D:/code/naive-admin-template/node_modules/.pnpm/unplugin-auto-import@0.17.6_@vueuse+core@10.11.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/code/naive-admin-template/node_modules/.pnpm/unplugin-vue-components@0.27.2_vue@3.4.31/node_modules/unplugin-vue-components/dist/vite.js";
import { NaiveUiResolver } from "file:///D:/code/naive-admin-template/node_modules/.pnpm/unplugin-vue-components@0.27.2_vue@3.4.31/node_modules/unplugin-vue-components/dist/resolvers.js";
import { createSvgIconsPlugin } from "file:///D:/code/naive-admin-template/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.3.3/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
import vueDevTools from "file:///D:/code/naive-admin-template/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.5_vite@5.3.3_vue@3.4.31/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        dts: "src/types/auto-import.d.ts",
        imports: [
          "vue",
          "vue-router",
          "pinia",
          { "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"] }
        ],
        resolvers: [],
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true
        }
      }),
      Components({
        dts: "src/types/components.d.ts",
        resolvers: [NaiveUiResolver()]
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
        symbolId: "svg-[name]"
      }),
      vueDevTools()
    ],
    resolve: {
      alias: {
        "@": "/src"
      }
    },
    server: {
      hmr: true
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXG5haXZlLWFkbWluLXRlbXBsYXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjb2RlXFxcXG5haXZlLWFkbWluLXRlbXBsYXRlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RlL25haXZlLWFkbWluLXRlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IE5haXZlVWlSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKCh7IG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlOiBlbnYuVklURV9QVUJMSUNfUEFUSCxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdnVlKCksXHJcbiAgICAgIFVub0NTUygpLFxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICBkdHM6ICdzcmMvdHlwZXMvYXV0by1pbXBvcnQuZC50cycsXHJcbiAgICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgICAndnVlLXJvdXRlcicsXHJcbiAgICAgICAgICAncGluaWEnLFxyXG4gICAgICAgICAgeyAnbmFpdmUtdWknOiBbJ3VzZURpYWxvZycsICd1c2VNZXNzYWdlJywgJ3VzZU5vdGlmaWNhdGlvbicsICd1c2VMb2FkaW5nQmFyJ10gfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHJlc29sdmVyczogW10sXHJcbiAgICAgICAgZXNsaW50cmM6IHtcclxuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICBmaWxlcGF0aDogJy4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb24nLFxyXG4gICAgICAgICAgZ2xvYmFsc1Byb3BWYWx1ZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgZHRzOiAnc3JjL3R5cGVzL2NvbXBvbmVudHMuZC50cycsXHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbTmFpdmVVaVJlc29sdmVyKCldLFxyXG4gICAgICB9KSxcclxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL3N2ZycpXSxcclxuICAgICAgICBzeW1ib2xJZDogJ3N2Zy1bbmFtZV0nLFxyXG4gICAgICB9KSxcclxuICAgICAgdnVlRGV2VG9vbHMoKSxcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiAnL3NyYydcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBobXI6IHRydWVcclxuICAgIH1cclxuICB9O1xyXG59KSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0USxTQUFTLGNBQWMsZUFBZTtBQUNsVCxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sVUFBVTtBQUNqQixPQUFPLGlCQUFpQjtBQUd4QixJQUFPLHNCQUFRLGFBQWMsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN6QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBRXZDLFNBQU87QUFBQSxJQUNMLE1BQU0sSUFBSTtBQUFBLElBQ1YsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsV0FBVztBQUFBLFFBQ1QsS0FBSztBQUFBLFFBQ0wsU0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsRUFBRSxZQUFZLENBQUMsYUFBYSxjQUFjLG1CQUFtQixlQUFlLEVBQUU7QUFBQSxRQUNoRjtBQUFBLFFBQ0EsV0FBVyxDQUFDO0FBQUEsUUFDWixVQUFVO0FBQUEsVUFDUixTQUFTO0FBQUEsVUFDVCxVQUFVO0FBQUEsVUFDVixrQkFBa0I7QUFBQSxRQUNwQjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1QsS0FBSztBQUFBLFFBQ0wsV0FBVyxDQUFDLGdCQUFnQixDQUFDO0FBQUEsTUFDL0IsQ0FBQztBQUFBLE1BQ0QscUJBQXFCO0FBQUEsUUFDbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxnQkFBZ0IsQ0FBQztBQUFBLFFBQ3hELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQSxNQUNELFlBQVk7QUFBQSxJQUNkO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUNGLENBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
