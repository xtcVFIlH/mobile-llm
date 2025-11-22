import localforage from "localforage";
import { z } from "zod";

export interface Item {
    id: string;
    name: string;
    api_key: string;
}
const ItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    api_key: z.string()
});
const ItemArraySchema = z.array(ItemSchema);

export class ApiConfig {

    private static readonly STORAGE_KEY = 'api_configs';

    private static generateUniqueId(): string
    {
        return 'id-' + Math.random().toString(36).substr(2, 9);
    }

    private static async readItemsFromStorage(): Promise<Item[]>
    {
        const data = await localforage.getItem<unknown>(
            this.STORAGE_KEY
        );

        const parsed = ItemArraySchema.safeParse(data);
        if (!parsed.success) {
            console.warn("Invalid data format in localforage for key", this.STORAGE_KEY);
            await this.writeItemsToStorage([]);

            return [];
        }

        return parsed.data;
    }
    private static async writeItemsToStorage(items: Item[]): Promise<void>
    {
        await localforage.setItem(
            this.STORAGE_KEY,
            items
        );
    }

    /**
     * 保存新的API配置
     * 
     * @param name 
     * @param apiKey 
     * @return 保存后的新列表
     */
    public static async save(name: string, apiKey: string): Promise<Item[]>
    {
        const items = await this.readItemsFromStorage();

        const newItem: Item = {
            id: this.generateUniqueId(),
            name: name,
            api_key: apiKey
        };
        items.push(newItem);

        await this.writeItemsToStorage(items);

        return items;
    }

    /**
     * 获取所有API配置
     * @returns API配置列表
     */
    public static async getAll(): Promise<Item[]>
    {
        return this.readItemsFromStorage();
    }

    /**
     * 通过ID删除API配置
     * @param id 配置ID
     * @returns 删除后的新列表
     */
    public static async deleteById(id: string): Promise<Item[]>
    {
        const items = await this.readItemsFromStorage();
        const filtered = items.filter(item => item.id !== id);

        await this.writeItemsToStorage(filtered);

        return filtered;
    }

}