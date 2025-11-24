import { LLMModelProviderInterface } from "../LLMModelProviderInterface";
import { InjectionKey } from "vue";

export const LLMModelProviderServiceKey = Symbol("LLMModelProviderService") as InjectionKey<LLMModelProviderServiceInterface>;

export interface LLMModelProviderServiceInterface {

    /**
     * Get one LLM Model Provider by its ID
     * @param id 
     * @return LLM Model Provider or null if not found
     */
    getOneById(id: string): Promise<LLMModelProviderInterface | null>;

    /**
     * Get all LLM Model Providers
     */
    getAll(): Promise<LLMModelProviderInterface[]>;

}