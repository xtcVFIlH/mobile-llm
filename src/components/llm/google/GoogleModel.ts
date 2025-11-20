import { ModelDTO } from "../../../dtos/llm/ModelDTO";
import { ModelInterface } from "../../../interfaces/llm/ModelInterface";
import { ApiConfigDTO } from "../../../dtos/llm/ApiConfigDTO";

import { GoogleGenAI } from "@google/genai";
import { GoogleSDKFactory } from "./GoogleSDKFactory";

export class GoogleModel implements ModelInterface {

    private googleSDK: GoogleGenAI;

    constructor(
        apiConfig: ApiConfigDTO
    ) {
        this.googleSDK = GoogleSDKFactory.getSDK(
            apiConfig.apiKey
        );
    }

    async getAllModels(): Promise<ModelDTO[]> {
        const models = await this.googleSDK.models.list({
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
                    model.displayName || model.name,
                    model.name
                )
            );
        }

        return result;
    }

}