import { ModelInterface } from "./ModelInterface";
import type { ModelDTO } from "./ModelInterface";
import { InjectionKey } from "vue";

export const ModelFactoryKey = Symbol("ModelFactory") as InjectionKey<ModelFactoryInterface>;

export interface ModelFactoryInterface
{

    createInstance(
        data: ModelDTO
    ): ModelInterface;

}