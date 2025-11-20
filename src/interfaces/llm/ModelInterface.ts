import { ModelDTO } from "../../dtos/llm/ModelDTO";

/**
 * 模型接口
 */
export interface ModelInterface {

    /**
     * 获取所有模型
     */
    getAllModels(): Promise<ModelDTO[]>;

}