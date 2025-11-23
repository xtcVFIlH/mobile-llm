import type { ModelDTO } from "interfaces/model/ModelInterface";
import type { ApiInterface } from "../ApiInterface";

export interface ApiRemoteQueryInterface {

    fetchAllModelsFromProvider(api: ApiInterface): Promise<ModelDTO[]>;

}