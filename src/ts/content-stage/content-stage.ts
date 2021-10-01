export interface ContentStage {
    initialise(): Promise<void>
}

export interface ContentStageElements {
    toFragment(): DocumentFragment
}

export interface FragmentedContentStage<T extends ContentStageElements> extends ContentStage {
    elements?: T
}