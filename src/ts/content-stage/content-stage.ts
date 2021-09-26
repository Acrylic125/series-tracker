export function getContentStageElement() {
    const contentStageElement = document.getElementById('content-stage');
    if (!contentStageElement)
        throw Error(`Content stage element (An element with id='content-stage') has not been define`)
    return contentStageElement;
}


export interface ContentStage {
    onInitialise(): void
    onUpdate(): void
    onTerminate(): void
}