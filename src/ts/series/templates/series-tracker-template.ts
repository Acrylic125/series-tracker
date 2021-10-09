// No generic type used to determine data type of template.
// This is due to deserialisation and unknown data being provided.
export interface SeriesTrackerTemplate {
    id: string
    createTrackerContent(templateData: SeriesTrackerTemplateData): HTMLElement
    decorateModalContent(trackerModalContent: HTMLElement, templateData: SeriesTrackerTemplateData): Promise<void>
}

export interface SeriesTrackerTemplateData {
    templateID: string
    data: any
}

export class SeriesTrackerTemplateDataMap {
    constructor(public map: Map<string, SeriesTrackerTemplateData> = new Map()) {}

    bindTemplateRawData(template: SeriesTrackerTemplate, data: any) {
        this.map.set(template.id, {
            templateID: template.id,
            data
        });
    }

    toJSON() {
        return Object.fromEntries(this.map);
    }
}
