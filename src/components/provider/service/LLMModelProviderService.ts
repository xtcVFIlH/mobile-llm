import type { LLMModelProviderInterface } from "@/interfaces/provider/LLMModelProviderInterface";
import type { LLMModelProviderServiceInterface } from "@/interfaces/provider/service/LLMModelProviderServiceInterface";

export class LLMModelProviderService implements LLMModelProviderServiceInterface
{

    private providers: LLMModelProviderInterface[];

    constructor(providers: LLMModelProviderInterface[]) {
        this.providers = providers;
    }

    public async getOneById(id: string): Promise<LLMModelProviderInterface | null> {
        const result = this.providers.find((provider) => provider.id === id);

        return result || null;
    }

    public async getAll(): Promise<LLMModelProviderInterface[]> {
        return this.providers;
    }

}