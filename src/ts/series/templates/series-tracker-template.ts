// No generic type used to determine data type of template.
// This is due to deserialisation and unknown data being provided.
export interface SeriesTrackerTemplate {
    id: string
    decorateTrackerDisplay(trackerDisplay: HTMLElement, templateData: SeriesTrackerTemplateData): Promise<void>
    decorateModalContent(trackerModalContent: HTMLElement, templateData: SeriesTrackerTemplateData): Promise<void>
}

export interface SeriesTrackerTemplateData {
    templateID: string
    data: any
}

export class SeriesTrackerTemplateDataMap {
    constructor(public map: Map<string, SeriesTrackerTemplateData> = new Map()) {}

    toJSON() {
        return Object.fromEntries(this.map);
    }
}
