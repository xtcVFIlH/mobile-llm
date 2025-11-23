import type { LLMModelProviderInterface } from "@/interfaces/provider/LLMModelProviderInterface";
import type { ApiRemoteQueryInterface } from "@/interfaces/api/service/ApiRemoteQueryInterface";
import type { ApiDTO, ApiInterface } from "@/interfaces/api/ApiInterface";

import { ApiServiceKey, ApiServiceInterface } from "@/interfaces/api/service/ApiServiceInterface";

import { inject } from "vue";

import type { ModelDTO } from "@/interfaces/model/ModelInterface";

export class LLMModelProvider implements LLMModelProviderInterface {

    readonly id: string;
    readonly name: string;

    private apiService: ApiServiceInterface = inject(ApiServiceKey)!;
    private apiRemoteQueryService: ApiRemoteQueryInterface;

    constructor(
        id: string,
        name: string,
        apiRemoteQueryService: ApiRemoteQueryInterface
    ) {
        this.id = id;
        this.name = name;
        this.apiRemoteQueryService = apiRemoteQueryService;
    }

    public async addApi(api: ApiDTO): Promise<ApiInterface[]> {
        await this.apiService.saveOne(api);

        return await this.getAllApis();
    }

    public async getAllApis(): Promise<ApiInterface[]> {
        return await this.apiService.getAllByProviderId(this.id);
    }

    public async fetchAllAvailableModelsFromProvider(api: ApiInterface): Promise<ModelDTO[]> {
        return await this.apiRemoteQueryService.fetchAllModelsFromProvider(api);
    }

}