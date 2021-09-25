export function getContentStageElement() {
    const contentStageElement = window.document.getElementById('content-stage');
    if (!contentStageElement)
        throw Error(`Content stage element (An element with id='content-stage') has not been define`)
    return contentStageElement;
}

export interface ContentStage {
    content(): void
}