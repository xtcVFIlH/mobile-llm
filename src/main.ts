import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { inject } from "vue";
import App from './App.vue'
import 'vant/es/toast/style';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

import { ApiConfigServiceKey } from "./interfaces/service/ApiConfigServiceInterface";
import { ApiConfigService } from "./components/service/local/ApiConfigService";
app.provide(ApiConfigServiceKey, new ApiConfigService());

import { LLMModelProvider } from "components/provider/LLMModelProvider";
import { GoogleModel as GoogleModelInfoService } from 'components/llm/google/GoogleModel';
import { LLMModelProvidersKey } from "interfaces/provider/LLMModelProviderInterface";
import { LLMModelProviderDTO } from "dtos/provider/LLMModelProviderDTO";
import { ApiFactory } from "components/provider/api/ApiFactory";
app.provide(LLMModelProvidersKey, [
    new LLMModelProvider(
        new LLMModelProviderDTO(
            "google",
            "Google LLM Models"
        ),
        new ApiFactory(
            new GoogleModelInfoService()
        ),
        inject(ApiConfigServiceKey)!
    )
]);

app.mount('#app');