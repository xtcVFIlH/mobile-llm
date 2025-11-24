import { ModelInterface } from "../model/ModelInterface";
import type { ModelDTO } from "../model/ModelInterface";

export class ApiDTO
{
    readonly name: string;
    readonly apiKey: string;
    readonly providerId: string;
    constructor(
        apiKey: string,
        name: string,
        providerId: string
    ) {
        this.apiKey = apiKey;
        this.name = name;
        this.providerId = providerId;
    }
}

export interface ApiInterface
{

    /**
     * API uniuque identifier
     */
    readonly id: string;

    /**
     * API readable name
     */
    readonly name: string;

    /**
     * API key
     */
    readonly apiKey: string;

    /**
     * Provider ID this API belongs to
     */
    readonly providerId: string;

    /**
     * Get all available models from this API's provider
     */
    getAllModelsFromProvider(): Promise<ModelDTO[]>;

    /**
     * Get all available models registered under this API
     */
    getAllModels(): Promise<ModelInterface[]>;

}