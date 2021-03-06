import { keyboardShortcutListener } from "../html-loaded/keyboard-shortcut";
import { stageRegistry } from "../registry/registries";
import { ContentStage } from "./content-stage";

export function getContentStageElement() {
    const contentStageElement = document.getElementById('content-stage');
    if (!contentStageElement)
        throw Error(`Content stage element (An element with id='content-stage') has not been define`)
    return contentStageElement;
}

function clearStage() {
    getContentStageElement().innerHTML = '';
}

export async function useStage(stage: ContentStage) {
    clearStage();
    await stage.initialise();
    getContentStageElement().scrollTo(0, 0);
    keyboardShortcutListener.reload();
}

export async function useStageByID(id: string) {
    const resultStage = stageRegistry.get(id);
    if (resultStage) {
        await useStage(resultStage);
    } else {
        console.warn(`Stage with id, ${id} was not found.`);
    }
}
