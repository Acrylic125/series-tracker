import { ActionButton } from "../../components/global-components";
import { SeriesTrackerTemplateData } from "./series-tracker-template";

export interface ChecklistTemplateDataItem {
    title?: string
    watched?: boolean
}

export interface ChecklistTemplateData extends SeriesTrackerTemplateData {
    items: ChecklistTemplateDataItem[]
}

const createChecklistItemButton: ActionButton = {
    tooltip: {
        title: "Create Checklist Item",
        text: "Click to create a new checklist item."
    },
    innerText: '\u002B',
    circular: false,
    singular: true
}