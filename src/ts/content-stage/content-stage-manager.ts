import { ContentStage } from "./content-stage";
import stageRegistry from "./registry/stage-registry";

export function getContentStageElement() {
    const contentStageElement = document.getElementById('content-stage');
    if (!contentStageElement)
        throw Error(`Content stage element (An element with id='content-stage') has not been define`)
    return contentStageElement;
}

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
