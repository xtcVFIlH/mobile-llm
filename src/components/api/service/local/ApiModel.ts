import { ApiDTO } from "@/interfaces/api/ApiInterface";
import localforage from "localforage";
import { z } from "zod";

export interface StorageItem {
    id: string;
    name: string;
    api_key: string;
    provider_id: string;
}
const StorageItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    api_key: z.string(),
    provider_id: z.string()
});
const StorageItemArraySchema = z.array(StorageItemSchema);

/**
 * Local storage model layer
 */
export class ApiModel
{

    private static readonly STORAGE_KEY = 'apis';

    private static generateUniqueId(): string
    {
        return 'id-' + Math.random().toString(36).substr(2, 9);
    }

    private static async readItemsFromStorage(): Promise<StorageItem[]>
    {
        const data = await localforage.getItem<unknown>(
            this.STORAGE_KEY
        );

        const parsed = StorageItemArraySchema.safeParse(data);
        if (!parsed.success) {
            console.warn("Invalid data format in localforage for key", this.STORAGE_KEY);
            await this.writeItemsToStorage([]);

            return [];
        }

        return parsed.data;
    }
    private static async writeItemsToStorage(items: StorageItem[]): Promise<void>
    {
        await localforage.setItem(
            this.STORAGE_KEY,
            items
        );
    }

    /**
     * Save a new API record
     * @param dto 
     * @returns The ID of the newly created record
     */
    public static async save(
        dto: ApiDTO
    ): Promise<string>
    {
        const items = await this.readItemsFromStorage();
        const newItem: StorageItem = {
            id: this.generateUniqueId(),
            name: dto.name,
            api_key: dto.apiKey,
            provider_id: dto.providerId
        };
        items.push(newItem);
        await this.writeItemsToStorage(items);

        return newItem.id;
    }

    /**
     * Get all API records by provider ID
     * @param providerId 
     */
    public static async getByProviderId(
        providerId: string
    ): Promise<StorageItem[]>
    {
        const items = await this.readItemsFromStorage();

        return items.filter(item => item.provider_id === providerId);
    }

    /**
     * Get all API records
     */
    public static async getAll(): Promise<StorageItem[]>
    {
        return await this.readItemsFromStorage();
    }

}