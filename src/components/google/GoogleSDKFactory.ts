import { GoogleGenAI } from "@google/genai";

export class GoogleSDKFactory {

    private static sdkCache: Map<string, GoogleGenAI> = new Map();

    /**
     * 获取 GoogleGenAI SDK 实例
     * @param apiKey API 密钥
     * @param forceNew 是否强制创建新的实例，默认为 false
     * @returns GoogleGenAI 实例
     */
    static getSDK(apiKey: string, forceNew = false): GoogleGenAI {
        if (!apiKey) {
            throw new Error("apiKey is required");
        }

        if (!forceNew) {
            const cached = GoogleSDKFactory.sdkCache.get(apiKey);
            if (cached) return cached;
        }

        const sdk = new GoogleGenAI({
            apiKey: apiKey
        });

        GoogleSDKFactory.sdkCache.set(apiKey, sdk);
        return sdk;
    }

    /** 判断指定 apiKey 是否有已缓存的 SDK */
    static hasSDK(apiKey: string): boolean {
        return GoogleSDKFactory.sdkCache.has(apiKey);
    }

    /** 删除指定 apiKey 对应的 SDK */
    static deleteSDK(apiKey: string): boolean {
        return GoogleSDKFactory.sdkCache.delete(apiKey);
    }

    /** 清空所有缓存的 SDK 实例 */
    static clear(): void {
        GoogleSDKFactory.sdkCache.clear();
    }
}