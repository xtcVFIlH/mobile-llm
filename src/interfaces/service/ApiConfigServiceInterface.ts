import type { ApiConfigDTO } from "../../dtos/llm/ApiConfigDTO";
import type { InjectionKey } from "vue";

export const ApiConfigServiceKey = Symbol("ApiConfigService") as InjectionKey<ApiConfigServiceInterface>;

export interface ApiConfigServiceInterface
{

    /**
     * 获取所有API配置
     * @returns API配置列表，可能为空数组
     */
    getAllApiConfigs(): Promise<ApiConfigDTO[]>;

    /**
     * 保存新的API配置
     * @param apiKey API KEY
     * @param name 配置名称
     * @returns 保存后的新列表
     * @throws Error 保存失败时抛出错误
     */
    saveNewApiConfig(
        apiKey: string,
        name: string
    ): Promise<ApiConfigDTO[]>;

    /**
     * 删除对应的API配置
     * @param id API配置的ID
     * @returns 删除后的新列表
     * @throws Error 删除失败时抛出错误
     */
    deleteApiConfigById(
        id: string
    ): Promise<ApiConfigDTO[]>;

}