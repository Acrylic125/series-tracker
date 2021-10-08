import { SeriesTrackerTemplate } from "./series-tracker-template";

export interface SeriesTemplateRegistry<T extends SeriesTrackerTemplate = SeriesTrackerTemplate, K = string> {
    registeredStages: Map<K, T>
    getStage(stageID: K): T | undefined;
    registerStage(stageID: K, stage: T): void
}

export function newStageRegistry(): SeriesTemplateRegistry {
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