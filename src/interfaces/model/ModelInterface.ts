export class ModelDTO
{
    readonly code: string;
    readonly displayName: string;
    readonly apiId: string;
    constructor(
        code: string,
        displayName: string,
        apiId: string
    ) {
        this.code = code;
        this.displayName = displayName;
        this.apiId = apiId;
    }
}

export interface ModelInterface
{

    /**
     * Model unique identifier
     */
    readonly id: string;

    /**
     * Model code, can be used to identify the model from provider
     */
    readonly code: string;

    /**
     * Model display name
     */
    readonly displayName: string;

    /**
     * API ID this model belongs to
     */
    readonly apiId: string;

}