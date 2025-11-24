import { ApiRemoteQueryInterface } from "@/interfaces/api/service/ApiRemoteQueryInterface";
import { ModelDTO } from "@/interfaces/model/ModelInterface";

import { GoogleSDKFactory } from "./GoogleSDKFactory";

import type { ApiInterface } from "@/interfaces/api/ApiInterface";

export class ApiRemoteQuery implements ApiRemoteQueryInterface {

    public async fetchAllModelsFromProvider(api: ApiInterface): Promise<ModelDTO[]> {
        const sdk = GoogleSDKFactory.getSDK(api.apiKey);

        const models = await sdk.models.list({
            config: {
                pageSize: 100,
            }
        });
        const result = [];

        for await (const model of models) {
            if (!model.name) {
                continue ;
            }
            result.push(
                new ModelDTO(
                    model.name,
                    model.displayName || model.name,
                    api.id
                )
            );
        }

        return result;
    }

}