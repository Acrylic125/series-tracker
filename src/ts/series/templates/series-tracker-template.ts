
export interface SeriesTrackerTemplate<T extends SeriesTrackerTemplateData = SeriesTrackerTemplateData> {
    title: string
    id: string
    newDefaultData(): T
    createTrackerContent(templateData: T): HTMLElement
    decorateModalContent(trackerModalContent: HTMLElement, templateData: T): Promise<void>
}

export type TemplateID = string;

export interface SeriesTrackerTemplateData {
    templateID: TemplateID
    data: any
}

export class SeriesTrackerTemplates {
    public selectedTemplateID?: TemplateID 
    
    constructor(public templateMap: Map<TemplateID, SeriesTrackerTemplateData>) {}

}
