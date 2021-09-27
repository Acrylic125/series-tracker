import { ContentStage } from "../content-stage";

export interface StageRegistry<T extends ContentStage = ContentStage, K = string> {
    registeredStages: Map<K, T>
    getStage(stageID: K): T | undefined;
    registerStage(stageID: K, stage: T): void
}

export function newStageRegistry(): StageRegistry {
    return {
        registeredStages: new Map(),
        getStage(stageID: string) {
            return this.registeredStages.get(stageID);
        },
        registerStage(stageID: string, stage: ContentStage) {
            this.registeredStages.set(stageID, stage);
        }
    }
}

const stageRegistry = newStageRegistry();
export default stageRegistry;