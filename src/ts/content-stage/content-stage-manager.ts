import { ContentStage } from "./content-stage";
import seriesCardsStage from "./stages/series-cards-stage";

export function getContentStageElement() {
    const contentStageElement = document.getElementById('content-stage');
    if (!contentStageElement)
        throw Error(`Content stage element (An element with id='content-stage') has not been define`)
    return contentStageElement;
}

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

export const stageRegistry = newStageRegistry();

export function useStage(stage: ContentStage) {
    stage.onInitialise();
}

export function useStageByID(id: string) {
    const resultStage = stageRegistry.getStage(id);
    if (resultStage) {
        useStage(resultStage);
    } else {
        console.warn(`Stage with id, ${id} was not found.`);
    }
}

stageRegistry.registerStage('series-cards', seriesCardsStage);
