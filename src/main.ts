import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';

import router from './router';
import AppLayout from './layouts/AppLayout.vue';
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(AppLayout);

const vueQueryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        gcTime: 1000 * 60 * 60 * 24,
      },
    },
  },
};
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(VueQueryPlugin, vueQueryOptions);
app.use(router);

app.mount('#app');
