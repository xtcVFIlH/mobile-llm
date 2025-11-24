import type { ApiInterface } from "@/interfaces/api/ApiInterface";
import type { ModelDTO, ModelInterface } from "@/interfaces/model/ModelInterface";

import type { LLMModelProviderServiceInterface } from "@/interfaces/provider/service/LLMModelProviderServiceInterface";
import { LLMModelProviderServiceKey } from "@/interfaces/provider/service/LLMModelProviderServiceInterface";

import { inject } from "vue";

export class Api implements ApiInterface {

    readonly id: string;
    readonly name: string;
    readonly apiKey: string;
    readonly providerId: string;

    private LLMModelProviderService: LLMModelProviderServiceInterface = inject(LLMModelProviderServiceKey)!;

    constructor(
        id: string,
        name: string,
        apiKey: string,
        providerId: string
    ) {
        this.id = id;
        this.name = name;
        this.apiKey = apiKey;
        this.providerId = providerId;
    }

    public async getAllModelsFromProvider(): Promise<ModelDTO[]> {
        const provider = await this.LLMModelProviderService.getOneById(this.providerId);

        if (!provider) {
            throw new Error('LLM Model Provider not found for the given providerId: ' + this.providerId);
        }

        return await provider.fetchAllAvailableModelsFromProvider(
            this
        );
    }

    public async getAllModels(): Promise<ModelInterface[]> {
        return [];
    }

}