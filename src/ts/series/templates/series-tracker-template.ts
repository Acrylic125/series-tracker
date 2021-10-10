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
                public templatesMap: Map<string, SeriesTrackerTemplateData> = new Map()) {}

    getTemplateDataByID(templateID: string) {
        const data = this.templatesMap.get(templateID);
        if (data) 
            return data;
        const template = seriesTemplateRegistry.get(templateID);
        if (template) {
            const newData = template.newDefaultData();
            this.bindTemplateRawDataByTemplate(template, newData);
        } else 
            throw new Error(`Template with id '${templateID}' is not registered.`);
    }

    getTemplateDataByTemplate(template: SeriesTrackerTemplate) {
        const data = this.templatesMap.get(template.id);
        if (data) 
            return data;
        const newData = template.newDefaultData();
        this.bindTemplateRawDataByTemplate(template, newData);
        return newData;
    }

    getSelectedTemplateData() {
        return (this.selectedTemplateID) ? this.getTemplateDataByID(this.selectedTemplateID) : undefined;
    }

    getSelectedTemplate() {
        return (this.selectedTemplateID) ? seriesTemplateRegistry.get(this.selectedTemplateID) : undefined;
    }

    setSelectedTemplate(template: SeriesTrackerTemplate) {
        this.selectedTemplateID = template.id;
    }

    bindTemplateRawDataByID(templateID: string, data: any) {
        this.templatesMap.set(templateID, {
            templateID, data
        });
    }

    bindTemplateRawDataByTemplate(template: SeriesTrackerTemplate, data: any) {
        this.bindTemplateRawDataByID(template.id, data);
    }

    toJSON() {
        return Object.fromEntries(this.templatesMap);
    }
}
