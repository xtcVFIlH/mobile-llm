import { defineStore } from 'pinia';
import { inject, ref } from 'vue';
import type { ApiDTO, ApiInterface } from '@/interfaces/api/ApiInterface';
import { ApiServiceKey } from '@/interfaces/api/service/ApiServiceInterface';

/**
 * Global store for APIs.
 */
export const useApisStore = defineStore('ApisStore', () => {

    const apis = ref<ApiInterface[]>([]);

    const apiService = inject(ApiServiceKey)!;

    /**
     * @throws Error
     */
    async function loadApis() {
        try {
            apis.value = await apiService.getAll();
        }
        catch (e: any) {
            const msg = e?.message ?? 'Unknown error occurred while loading APIs.';
            throw new Error(msg);
        }
    }

    /**
     * @throws Error
     * @param data The API data to add.
     */
    async function addApi(data: ApiDTO) {
        try {
            await apiService.saveOne(data);

            apis.value = await apiService.getAll(); // Refresh the list after adding a new API
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