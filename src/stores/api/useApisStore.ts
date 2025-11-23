import { defineStore } from 'pinia';
import { inject, ref } from 'vue';
import type { ApiDTO, ApiInterface } from '@/interfaces/api/ApiInterface';
import { LLMModelProviderInterface } from '@/interfaces/provider/LLMModelProviderInterface';

export const useApisStore = (modelProvider: LLMModelProviderInterface) => {

    const storeId = 'apis-' + modelProvider.id;

    return defineStore(storeId, () => {

        const apis = ref<ApiInterface[]>([]);

        async function loadApis() {
            try {
                apis.value = await modelProvider.getAllApis();
            }
            catch (e: any) {
                const msg = e?.message ?? 'Unknown error occurred while loading APIs.';
                throw new Error(msg);
            }
        }

        async function addApi(data: ApiDTO) {
            try {
                apis.value = await modelProvider.addApi(
                    data
                );
            }
            catch (e: any) {
                const msg = e?.message ?? 'Unknown error occurred while adding new API.';
                throw new Error(msg);
            }
        }

        return {
            apis,
            loadApis,
            addApi
        };

    });

}