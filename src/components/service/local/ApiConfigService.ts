import { ApiConfigServiceInterface } from "../../../interfaces/service/ApiConfigServiceInterface";
import { ApiConfigDTO } from "../../../dtos/llm/ApiConfigDTO";
import { ApiConfig as ApiConfigModel, Item as ApiConfigModelFields } from "./model/ApiConfig";

export class ApiConfigService implements ApiConfigServiceInterface {

    private fieldsToDTO(record: ApiConfigModelFields): ApiConfigDTO {
        return new ApiConfigDTO(
            record.id,
            record.name,
            record.api_key
        );
    }

    public async getAllApiConfigs(): Promise<ApiConfigDTO[]> {
        const records = await ApiConfigModel.getAll();

        return records.map(record => this.fieldsToDTO(record));
    }

    public async saveNewApiConfig(apiKey: string, name: string): Promise<ApiConfigDTO[]> {
        const records = await ApiConfigModel.save(
            name, apiKey
        );

        return records.map(record => this.fieldsToDTO(record));
    }

    public async deleteApiConfigById(id: string): Promise<ApiConfigDTO[]> {
        const records = await ApiConfigModel.deleteById(id);

        return records.map(record => this.fieldsToDTO(record));
    }
        
}