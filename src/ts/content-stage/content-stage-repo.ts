import { contextBridge } from "electron";
import { ContentStage } from "./content-stage";

export class ContentStageRepository {
    constructor(private stageMap: Map<string, ContentStage> = new Map()) {}

    public registerContentStage(id: string, stage: ContentStage) {
        this.stageMap.set(id, stage);
    }

    public getContentStage(id: string) {
        return this.stageMap.get(id);
    }
}

const contentStageRepository = new ContentStageRepository();
export default contentStageRepository;