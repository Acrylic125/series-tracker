import { seriesTemplateRegistry } from "../../registry/registries";

export interface SeriesTrackerTemplate<T extends SeriesTrackerTemplateData = SeriesTrackerTemplateData> {
    title: string
    id: string
    newDefaultData(): T
    createTrackerContent(templateData: T): HTMLElement
    decorateModalContent(trackerModalContent: HTMLElement, templateData: T): Promise<void>
}

export type TemplateID = string;

/**
 * Add in properties of the template data by extending upon this class.
 */
export interface SeriesTrackerTemplateData {
    templateID: TemplateID
}

export class SeriesTrackerTemplates {
    public selectedTemplateID?: TemplateID 
    // TemplateID should match the templateID of the SeriesTrackerTemplateData and the template for the template data.
    private templateDataMap: Map<TemplateID, SeriesTrackerTemplateData> = new Map()

    /**
     * DO NOT ASSUME THE RESULT IS GUARANTEED TO HAVE THE 
     * DATA. ALWAYS HAVE PROPERTIES OF DATA ATTRIBUTES BE NULLABLE!
     */ 
    public getTemplateDataByTemplate<T extends SeriesTrackerTemplateData>(template: SeriesTrackerTemplate<T>, defaultAddIfNonExist = true): T {
        var data = this.templateDataMap.get(template.id);
        if (data)
            return data as T; // Unchecked* Casting - This can be assumed.
        data = template.newDefaultData();
        if (defaultAddIfNonExist) 
            this.addTemplateDataForTemplate(template, data);
        return data as T; // newDefaultData() produces a non undefined result.
    }

    public addTemplateDataForTemplate<T extends SeriesTrackerTemplateData>(template: SeriesTrackerTemplate<T>, data: T) {
        this.templateDataMap.set(template.id, data);
    }

    public getSelectedTemplate() {
        return (this.selectedTemplateID) ? seriesTemplateRegistry.get(this.selectedTemplateID) : undefined;
    }

    public getSelectedTemplateData() {
        return (this.selectedTemplateID) ? this.templateDataMap.get(this.selectedTemplateID) : undefined;
    }

    public toJSON() {
        return {
            selectedTemplateID: this.selectedTemplateID,
            templateDataMap: Object.fromEntries(this.templateDataMap)
        };
    }

}
