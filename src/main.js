import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './index.css';
import 'element-plus/dist/index.css';
import { createI18n } from 'vue-i18n';
import SocketIo from '~/plugins/Socket.io';

/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
import messages from '@intlify/vite-plugin-vue-i18n/messages';

const i18n = createI18n({
  locale: 'en',
  messages,
});

const pinia = createPinia();

const app = createApp(App);

app.use(router).use(i18n).use(pinia);

app.use(SocketIo, {
  connection: '/',
  options: {
    autoConnect: false, //关闭自动连接
    transforms: ['websocket'],
  },
});

app.mount('#app');
