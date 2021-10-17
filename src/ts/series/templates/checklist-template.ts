import { ActionButton } from "../../components/global-components";
import { SeriesTrackerTemplateData } from "./series-tracker-template";

// <div class="modal__tracker-template-content">
// <button class="small-singular action-button center-horz rounded-1">&plus;</button>
// <div class="template__checklist-container center-horz">
//   <div class="template__checklist-container-item rounded-1">
//     <input type="checkbox" name="vehicle3" value="Boat">
//     <textarea class="text-as-height title input-focus-indicator no-border no-outline" type="text"
//       placeholder="Title"></textarea>
//   </div>
// </div>
// </div>

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