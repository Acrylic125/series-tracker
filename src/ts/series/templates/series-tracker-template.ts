// No generic type used to determine data type of template.

import { seriesTemplateRegistry } from "../../registry/registries";

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

export class SeriesTrackerTemplates {
    constructor(public selectedTemplate: string | undefined,
                public templates: Map<string, SeriesTrackerTemplateData> = new Map()) {}
    
    getSelectedTemplate() {
        return (this.selectedTemplate) ? seriesTemplateRegistry.get(this.selectedTemplate) : undefined;
    }

    setTemplate(template: SeriesTrackerTemplate) {
        this.selectedTemplate = template.id;
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
