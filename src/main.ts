import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import 'vant/es/toast/style';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

import { ApiConfigServiceKey } from "./interfaces/service/ApiConfigServiceInterface";
import { ApiConfigService } from "./components/service/local/ApiConfigService";
app.provide(ApiConfigServiceKey, new ApiConfigService());

app.mount('#app');