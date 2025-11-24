import { ApiInterface } from "../ApiInterface";
import type { ApiDTO } from "../ApiInterface";

import { InjectionKey } from "vue";
export const ApiServiceKey = Symbol("ApiService") as InjectionKey<ApiServiceInterface>;

export interface ApiServiceInterface
{

    saveOne(data: ApiDTO): Promise<ApiInterface>;

    getAllByProviderId(providerId: string): Promise<ApiInterface[]>;

    getAll(): Promise<ApiInterface[]>;

}