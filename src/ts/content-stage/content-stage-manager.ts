import { reloadScripts } from "../html-loaded/preloaders/html-preloaders";
import { ContentStage } from "./content-stage";
import stageRegistry from "./registry/stage-registry";

export function getContentStageElement() {
    const contentStageElement = document.getElementById('content-stage');
    if (!contentStageElement)
        throw Error(`Content stage element (An element with id='content-stage') has not been define`)
    return contentStageElement;
}

export async function useStage(stage: ContentStage) {
    await stage.initialise();
}

export async function useStageByID(id: string) {
    const resultStage = stageRegistry.getStage(id);
    if (resultStage) {
        await useStage(resultStage);
        await reloadScripts();
    } else {
        console.warn(`Stage with id, ${id} was not found.`);
    }
}
