// No generic type used to determine data type of template.

import { seriesTemplateRegistry } from "../../registry/registries";

// This is due to deserialisation and unknown data being provided.
export interface SeriesTrackerTemplate {
    title: string
    id: string
    newDefaultData(): SeriesTrackerTemplateData
    createTrackerContent(templateData: SeriesTrackerTemplateData): HTMLElement
    decorateModalContent(trackerModalContent: HTMLElement, templateData: SeriesTrackerTemplateData): Promise<void>
}

export interface SeriesTrackerTemplateData {
    templateID: string
    data: any
}

export class SeriesTrackerTemplates {
    constructor(public selectedTemplateID: string | undefined,
                public templates: Map<string, SeriesTrackerTemplateData> = new Map()) {}

    getTemplateData(seriesTemplate: SeriesTrackerTemplate | string) {
        if (typeof seriesTemplate === 'string')  {
            const data = this.templates.get(seriesTemplate);
            if (data) 
                return data;
            const template = seriesTemplateRegistry.get(seriesTemplate);
            if (template)
                return template.newDefaultData();
            else 
                throw new Error(`Template with id '${id}' is not registered.`);
        } else {
            const data = this.templates.get(seriesTemplate.id);
            return (data) ? data : seriesTemplate.newDefaultData();
        }
    }

    getSelectedTemplateData() {
        return (this.selectedTemplateID) ? this.getTemplateData(this.selectedTemplateID) : undefined;
    }

    getSelectedTemplate() {
        return (this.selectedTemplateID) ? seriesTemplateRegistry.get(this.selectedTemplateID) : undefined;
    }

    setSelectedTemplate(template: SeriesTrackerTemplate) {
        this.selectedTemplateID = template.id;
    }

    bindTemplateRawData(template: SeriesTrackerTemplate, data: any) {
        this.templates.set(template.id, {
            templateID: template.id,
            data
        });
    }

    toJSON() {
        return Object.fromEntries(this.templates);
    }
}
