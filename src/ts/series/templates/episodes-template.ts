import { ActionButton, bindRightClickMenu, createActionButton, createDivWithClasses, createElementWithClasses, createTextAsHeightComponent, createInnerText } from "../../components/global-components";
import { createSeriesTrackerItem } from "../../components/series-tracker/series-tracker-content-item";
import { Parser } from "../../utils/parser";
import { removeElementFromArray, shifElementtLeft, shifElementtRight, undefinedOrDefault } from "../../utils/utils";
import { SeriesTrackerTemplate, SeriesTrackerTemplateData } from "./series-tracker-template";

export interface EpisodesTemplateDataItem {
    title?: string
    currentEpisode?: number
}

export const episodesTemplateDataItemParser: Parser<EpisodesTemplateDataItem> = {
    parse(data): EpisodesTemplateDataItem {
        return {
            title: data.title,
            currentEpisode: data.currentEpisode
        };
    }
};

export interface EpisodesTemplateData extends SeriesTrackerTemplateData {
    items: EpisodesTemplateDataItem[]
}

const createEpisodeButton: ActionButton = {
    tooltip: {
        title: "Create Episode Status",
        text: "Click to create a new episode status."
    },
    innerText: '\u002B',
    circular: false,
    singular: true
}

// <textarea class="text-as-height title input-focus-indicator no-border no-outline" type="text"
//   placeholder="Title"></textarea>
export function createEpisodesContainerItemTitle(title?: string, oninputcomplete?: (event: Event) => void) {
    const titleComponent = createTextAsHeightComponent({
        value: title,
        placeholder: "No Title",
        classes: [ 'w-60', 'title', 'center-horz', 'input-focus-indicator' ],
        oninputcomplete
    });
    return titleComponent;
}

// <input class="ol-input" placeholder="0" min="0" type="number">
export function createEpisodesContainerItemInput(currentEpisode?: number) {
    const input = createElementWithClasses('input', 'ol-input') as HTMLInputElement;
    input.placeholder = '0';
    input.min = '0';
    input.type = 'number';
    if (currentEpisode)
        input.value = currentEpisode + '';
    return input;
}

// <div class="template__episodes-container-item rounded-1">
//   <p class="text-lighter">Last Watched<br>Episode:</p>
// </div>
export function createEpisodesContainerItem(item: EpisodesTemplateDataItem) {
    const itemElement = createDivWithClasses('template__episodes-container-item', 'rounded-1');
    const { dynamicElement, heightAsText } = createEpisodesContainerItemTitle(item.title, () => {
        item.title = heightAsText.value;
    });
    const currentEpisodeElement = createEpisodesContainerItemInput(item.currentEpisode);
    currentEpisodeElement.addEventListener('input', () => item.currentEpisode = (currentEpisodeElement.value) ? parseInt(currentEpisodeElement.value) : 0);

    itemElement.appendChild(dynamicElement);
    itemElement.appendChild(createInnerText('p', 'Last Watched\nEpisode:', 'text-lighter', 'template__episodes-container-item--last-watched'));
    itemElement.appendChild(currentEpisodeElement);
    return itemElement;
}

// <div class="template__episodes-container center-horz"> </div>
export function createEpisodesContainerDisplayer(items: EpisodesTemplateDataItem[]) {
    const containerElement = createDivWithClasses('template__episodes-container', 'center-horz');
    const displayer = { containerElement, items, addItemToDisplayer, refresh };
    refresh();
    return displayer;

    async function addItemToDisplayer(item: EpisodesTemplateDataItem) {
        const itemElement = createEpisodesContainerItem(item);
        containerElement.appendChild(itemElement);
        bindRightClickMenu(itemElement, {
            buttons: [
                {
                    text: "Delete",
                    onClick() {
                        removeElementFromArray(displayer.items, item);
                        displayer.refresh();
                    }
                },
                {
                    text: "Shift Left",
                    onClick() {
                        shifElementtLeft(displayer.items, item);
                        displayer.refresh();
                    }
                },
                {
                    text: "Shift Right",
                    onClick() {
                        shifElementtRight(displayer.items, item);
                        displayer.refresh();
                    }
                }
            ]
        });
    }

    async function refresh() {
        containerElement.innerHTML = '';
        items.forEach(addItemToDisplayer);
    }
}

export const episodesTemplateID = 'episodes-template';
export const newDefaultEpisodesData: () => EpisodesTemplateData = () => ({
    items: []
});
export const episodesTemplateParser: Parser<EpisodesTemplateData> = {
    parse(data: any): EpisodesTemplateData {
        const episodesData = newDefaultEpisodesData();
        const items= data.items,
              episodesDataItems = episodesData.items;
        if (items instanceof Array) {
            items.forEach((item) => 
                episodesDataItems.push(episodesTemplateDataItemParser.parse(item)));  
        }
        return episodesData;
    }
}

export function createEpisodesTemplate(): SeriesTrackerTemplate<EpisodesTemplateData> {
    return {
        title: 'Episodes Template',
        id: episodesTemplateID,
        templateDataParser: episodesTemplateParser,
        newDefaultData: newDefaultEpisodesData,
        createSeriesTrackerContent(templateData: EpisodesTemplateData) {
            const contentElement = document.createElement('ol');
            templateData.items.forEach((item) => 
                contentElement.appendChild(createSeriesTrackerItem(undefinedOrDefault(item.title, 'No Title'),
                                                                   'Episode ' + undefinedOrDefault(item.currentEpisode, 0))));
            return contentElement;
        },
        // <button class="small-singular action-button center-horz rounded-1">&plus;</button>
        // <div class="template__episodes-container center-horz"> </div>
        async applyModalContent(trackerModalContent: HTMLElement, templateData: EpisodesTemplateData) {
            const containerDisplayer = createEpisodesContainerDisplayer(templateData.items);
            const containerDisplayerElement = containerDisplayer.containerElement;
            const buttonElement = createActionButton(createEpisodeButton);
            buttonElement.classList.add('center-horz');
            trackerModalContent.appendChild(buttonElement);
            buttonElement.onclick = () => {
                const containerItem = {};
                templateData.items.push(containerItem);
                containerDisplayer.addItemToDisplayer(containerItem);
            };
            trackerModalContent.appendChild(containerDisplayerElement);
        }
    };
}

export const episodesTemplate = createEpisodesTemplate();
