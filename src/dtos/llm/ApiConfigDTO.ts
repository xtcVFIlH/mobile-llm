/**
 * LLM API配置DTO
 */
export class ApiConfigDTO {

    /** 配置ID */
    readonly id: string;

    /** 配置名称 */
    readonly name: string;

    /** 服务商提供的API key */
    readonly apiKey: string;

    constructor(
        id: string,
        name: string,
        apiKey: string
    ) {
        this.id = id;
        this.name = name;
        this.apiKey = apiKey;
    }

}