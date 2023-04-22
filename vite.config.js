import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import Icons from 'unplugin-icons/vite';

import svgLoader from 'vite-svg-loader';
import vueJsx from '@vitejs/plugin-vue-jsx';

import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);
  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      vue(),

      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      }),

      Icons({ compiler: 'vue3', autoInstall: true }),
      svgLoader(),
      Pages(),
      Layouts(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ['vue', 'vue-router', '@vueuse/core'],
        dirs: ['./src/composables'],
        vueTemplate: false,
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),

      // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [path.resolve(__dirname, 'locales/**')],
      }),
    ],
    server: {
      // port: 3000,
      cors: true,
      proxy: {
        // '/socket.io': {
        //   // target: 'http://localhost:7200',
        //   // ws: true,
        // },
        // [env.VITE_APP_BASE_API]: {
        //   target: 'http://localhost:7200/', // 在 env 文件中配置了 API=XXX
        //   changeOrigin: true,
        //   // rewrite: (path) => path.replace(/^\/api/, ''),
        // },
        // ['/downloads']: {
        //   target: 'http://localhost:7200',
        //   changeOrigin: true,
        // },
      },
    },
  };
});
