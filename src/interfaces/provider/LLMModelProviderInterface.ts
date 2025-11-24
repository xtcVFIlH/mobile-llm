import type { ApiInterface, ApiDTO } from "interfaces/api/ApiInterface";
import type { InjectionKey } from "vue";
import type { ApiRemoteQueryInterface } from "interfaces/api/service/ApiRemoteQueryInterface";
import type { ModelDTO } from "interfaces/model/ModelInterface";

export const LLMModelProviderServiceKey = Symbol("LLMModelProviders") as InjectionKey<LLMModelProviderInterface[]>;

export interface LLMModelProviderInterface {

    readonly id: string;

    readonly name: string;

    /**
     * Add a new API configuration to this provider
     * @param api 
     * @return Updated list of APIs under this provider
     */
    addApi(api: ApiDTO): Promise<ApiInterface[]>;

    /**
     * Get all APIs registered under this provider
     */
    getAllApis(): Promise<ApiInterface[]>;

    /**
     * Get all available models from the provider using the given API configuration
     * @param api
     */
    fetchAllAvailableModelsFromProvider(api: ApiInterface): Promise<ModelDTO[]>;

}