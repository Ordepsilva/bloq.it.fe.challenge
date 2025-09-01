import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';

import router from './router';
import AppLayout from './layouts/AppLayout.vue';
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { registerSW } from 'virtual:pwa-register';
registerSW({
  onNeedRefresh() {
    // Show a toast notification to the user instead of reloading
    import('vue-sonner').then(({ toast }) => {
      toast('A new update is available! Please refresh the page when convenient.', {
        description: 'You can continue using the app offline.',
        duration: 8000,
      });
    });
  },
  onOfflineReady() {
    console.log('App is ready to work offline!');
  },
});

const app = createApp(AppLayout);
const vueQueryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        gcTime: 1000 * 60 * 60 * 24,
        staleTime: 1000 * 60 * 5,
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
