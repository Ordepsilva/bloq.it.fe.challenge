import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import router from './router';
import AppLayout from './layouts/AppLayout.vue';
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query';

const app = createApp(AppLayout);

const vueQueryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  },
};

app.use(createPinia());
app.use(VueQueryPlugin, vueQueryOptions);
app.use(router);

app.mount('#app');
