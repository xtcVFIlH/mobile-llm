import type { ApiDTO, ApiInterface } from "@/interfaces/api/ApiInterface";
import type { ApiServiceInterface } from "@/interfaces/api/service/ApiServiceInterface";
import { Api } from "@/components/api/Api";
import { ApiModel as ModelLayer } from "./ApiModel";

/**
 * Local storage implementation of ApiServiceInterface
 */
export class ApiService implements ApiServiceInterface {

    public async saveOne(data: ApiDTO): Promise<ApiInterface> {
        const newId = await ModelLayer.save(data);

        return new Api(
            newId,
            data.name,
            data.apiKey,
            data.providerId
        );
    }

    public async getAllByProviderId(providerId: string): Promise<ApiInterface[]> {
        const records = await ModelLayer.getByProviderId(providerId);

        return records.map(record => new Api(
            record.id,
            record.name,
            record.api_key,
            record.provider_id
        ));
    }

    public async getAll(): Promise<ApiInterface[]> {
        const records = await ModelLayer.getAll();

        return records.map(record => new Api(
            record.id,
            record.name,
            record.api_key,
            record.provider_id
        ));
    }

}