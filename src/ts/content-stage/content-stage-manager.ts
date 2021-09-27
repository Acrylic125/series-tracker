import { type } from "os";
import { ContentStage } from "./content-stage";

export interface StageRegistry<T extends ContentStage, K = string> {
    registeredStages: Map<K, T>
    getStage(stageID: K): T | undefined;
    registerStage(stageID: K, stage: T): void
}

export function newStageRegistry(): StageRegistry<ContentStage> {
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

export interface StageManager<T extends ContentStage, K = string> {
    stageRegistry: StageRegistry<T, K>
    useStage(stage: T): void
    useStageByID(id: K): void
}

export function getContentStageElement() {
    const contentStageElement = document.getElementById('content-stage');
    if (!contentStageElement)
        throw Error(`Content stage element (An element with id='content-stage') has not been define`)
    return contentStageElement;
}

const stageManager: StageManager<ContentStage> = {
    stageRegistry: newStageRegistry(),
    useStage(stage: ContentStage) {
        stage.onInitialise();
    },
    useStageByID(id: string) {
        const resultStage = this.stageRegistry.getStage(id);
        if (resultStage) {
            this.useStage(resultStage);
        } else {
            console.warn(`Stage with id, ${id} was not found.`);
        }
    }
}

export default stageManager;
