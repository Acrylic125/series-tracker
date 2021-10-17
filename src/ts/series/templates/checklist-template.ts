import { ActionButton, bindRightClickMenu, createActionButton, createDivWithClasses, createElementWithClasses, createTextAsHeightComponent } from "../../components/global-components";
import { createSeriesTrackerItem } from "../../components/series-tracker/series-tracker-content-item";
import { Parser } from "../../utils/parser";
import { removeElementFromArray, shifElementtLeft, shifElementtRight, undefinedOrDefault } from "../../utils/utils";
import { SeriesTrackerTemplate, SeriesTrackerTemplateData } from "./series-tracker-template";

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


export const checklistTemplateDataItemParser: Parser<ChecklistTemplateDataItem> = {
    parse(data): ChecklistTemplateDataItem {
        return {
            title: data.title,
            watched: data.watched
        };
    }
};

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

export function createCheclistItemTitle(title?: string, oninputcomplete?: (event: Event) => void) {
    const titleComponent = createTextAsHeightComponent({
        value: title,
        placeholder: "No Title",
        classes: [ 'title' ],
        oninputcomplete
    });
    return titleComponent;
}

// <div class="template__checklist-container-item rounded-1">
//   <input type="checkbox" name="vehicle3" value="Boat">
//   <textarea class="text-as-height title input-focus-indicator no-border no-outline" type="text"
//     placeholder="Title"></textarea>
// </div>
export function createChecklistContainerItem(dataItem: ChecklistTemplateDataItem) {
    const { dynamicElement, heightAsText } = createCheclistItemTitle(dataItem.title, () => {
        dataItem.title = heightAsText.value;
    });
    const itemElement = createDivWithClasses('template__checklist-container-item', 'rounded-1');
    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.checked = undefinedOrDefault(dataItem.watched, false);
    checkboxElement.addEventListener('change', () => {
        dataItem.watched = checkboxElement.checked;
    });
    itemElement.appendChild(checkboxElement);
    itemElement.appendChild(dynamicElement);
    return itemElement;
}

export const checklistTemplateID = 'checklist-template';
export const newDefaultChecklistData: () => ChecklistTemplateData = () => ({
    items: []
});
export const checklistTemplateParser: Parser<ChecklistTemplateData> = {
    parse(data: any): ChecklistTemplateData {
        const checklistData = newDefaultChecklistData();
        const items= data.items,
              checklistDataItems = checklistData.items;
        if (items instanceof Array) {
            items.forEach((item) => 
                checklistDataItems.push(checklistTemplateDataItemParser.parse(item)));  
        }
        return checklistData;
    }
}

export function createChecklistContainerDisplayer(items: ChecklistTemplateDataItem[]) {
    const containerElement = createDivWithClasses('template__checklist-container', 'center-horz');
    const displayer = { containerElement, items, addChecklistTemplateItem: addItemToDisplay, refresh };
    refresh();
    return displayer;

    async function addItemToDisplay(item: ChecklistTemplateDataItem) {
        const itemElement = createChecklistContainerItem(item);
        containerElement.appendChild(itemElement);
        bindRightClickMenu(itemElement, {
            buttons: [
                {
                    text: "Delete",
                    onClick() {
                        removeElementFromArray(items, item);
                        displayer.refresh();
                    }
                },
                {
                    text: "Shift Up",
                    onClick() {
                        shifElementtLeft(items, item);
                        displayer.refresh();
                    }
                },
                {
                    text: "Shift Down",
                    onClick() {
                        shifElementtRight(items, item);
                        displayer.refresh();
                    }
                }
            ]
        });
    }

    async function refresh() {
        containerElement.innerHTML = '';
        items.forEach((item) => 
            addItemToDisplay(item));
    }
}

export function createChecklistTemplate(): SeriesTrackerTemplate<ChecklistTemplateData> {
    return {
        title: 'Checklist Template',
        id: checklistTemplateID,
        templateDataParser: checklistTemplateParser,
        newDefaultData: newDefaultChecklistData,
        createSeriesTrackerContent(templateData: ChecklistTemplateData) {
            const contentElement = document.createElement('ol');
            templateData.items.forEach((item) => 
                contentElement.appendChild(createSeriesTrackerItem(undefinedOrDefault(item.title, 'No Title'),
                                                                   'Watched: ' + undefinedOrDefault(item.watched, false))));
            return contentElement;
        },
        // <button class="small-singular action-button center-horz rounded-1">&plus;</button>
        // <div class="template__episodes-container center-horz"> </div>
        async applyModalContent(trackerModalContent: HTMLElement, templateData: ChecklistTemplateData) {
            const containerDisplayer = createChecklistContainerDisplayer(templateData.items);
            const containerDisplayerElement = containerDisplayer.containerElement;
            const buttonElement = createActionButton(createChecklistItemButton);
            buttonElement.classList.add('center-horz');
            trackerModalContent.appendChild(buttonElement);
            buttonElement.onclick = () => {
                const item = {};
                containerDisplayer.items.push(item);
                containerDisplayer.addChecklistTemplateItem(item);
            };
            trackerModalContent.appendChild(containerDisplayerElement);
        }
    };
}

export const checklistTemplate = createChecklistTemplate();
