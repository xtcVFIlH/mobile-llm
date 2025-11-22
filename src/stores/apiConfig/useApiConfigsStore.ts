import { defineStore } from 'pinia';
import { inject, ref } from 'vue';
import { ApiConfigDTO } from '../../dtos/llm/ApiConfigDTO';
import { ApiConfigServiceKey } from '../../interfaces/service/ApiConfigServiceInterface';

export const useApiConfigsStore = defineStore('apiConfigs', () => {

    const apiConfigService = inject(ApiConfigServiceKey)!;

    const apiConfigs = ref<ApiConfigDTO[]>([]);

    /**
     * @throws Error 加载失败时抛出错误
     */
    async function loadAllApiConfigs(): Promise<void>
    {
        try {
            apiConfigs.value = await apiConfigService.getAllApiConfigs();
        }
        catch (e: any)
        {
            const msg = e?.message ?? 'Unknown error occurred while loading API configurations.';
            throw new Error(msg);
        }
    }

    /**
     * @throws Error 保存失败时抛出错误
     * @param apiKey 
     * @param name 
     */
    async function addNewApiConfig(apiKey: string, name: string): Promise<void>
    {
        try {
            apiConfigs.value = await apiConfigService.saveNewApiConfig(apiKey, name);
        }
        catch (e: any)
        {
            const msg = e?.message ?? 'Unknown error occurred while adding new API configuration.';
            throw new Error(msg);
        }
    }

    /**
     * @throws Error 删除失败时抛出错误
     * @param id 
     */
    async function deleteApiConfigById(id: string): Promise<void>
    {
        try {
            apiConfigs.value = await apiConfigService.deleteApiConfigById(id);
        }
        catch (e: any)
        {
            const msg = e?.message ?? 'Unknown error occurred while deleting API configuration.';
            throw new Error(msg);
        }
    }

    return {
        apiConfigs,
        loadAllApiConfigs,
        addNewApiConfig,
        deleteApiConfigById
    };

});