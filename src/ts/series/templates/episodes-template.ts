import { ActionButton, createActionButton, createDivWithClasses, createElementWithClasses, createInnerText } from "../../components/global-components";
import { createSeriesTrackerItem } from "../../components/series-tracker/series-tracker-content-item";
import { Parser } from "../../utils/parser";
import { undefinedOrDefault } from "../../utils/utils";
import { SeriesTrackerTemplate, SeriesTrackerTemplateData } from "./series-tracker-template";

export interface EpisodesTemplateDataItem {
    title?: string
    currentEpisode?: number
}

export const episodesTemplateDataItemParser: Parser<EpisodesTemplateDataItem> = {
    id: 'episodes-data-item',
    parse(data) {
        return {
            title: data.title,
            currentEpisode: data.currentEpisode
        };
    }
};

export interface EpisodesTemplateData {
    items: EpisodesTemplateDataItem[]
}

export const episodesTemplateDataParser: Parser<EpisodesTemplateData> = {
    id: 'episodes-data',
    parse(data) {
        var items = new Array<EpisodesTemplateDataItem>();
        const itemsFromData = data.items;
        if (itemsFromData instanceof Array) {
            itemsFromData.forEach((item) => 
                items.push(episodesTemplateDataItemParser.parse(item)));
        }
        data.items = items;
        return { items };
    }
};

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
export function createEpisodesContainerItemTitle() {
    const title = createElementWithClasses('textarea',
                                                       'text-as-height', 
                                                       'title',
                                                       'input-focus-indicator',
                                                       'no-border',
                                                       'no-outline') as HTMLTextAreaElement;
    title.placeholder = 'Title';
    return title;
}

// <input class="ol-input" placeholder="0" min="0" type="number">
export function createEpisodesContainerItemInput() {
    const input = createElementWithClasses('input', 'ol-input') as HTMLInputElement;
    input.placeholder = '0';
    input.min = '0';
    input.type = 'number';
    return input;
}

// <div class="template__episodes-container-item rounded-1">
//   <p class="text-lighter">Last Watched<br>Episode:</p>
// </div>
export function createEpisodesContainerItem(item: EpisodesTemplateDataItem) {
    const itemElement = createDivWithClasses('template__episodes-container-item', 'rounded-1');
    itemElement.appendChild(createEpisodesContainerItemTitle());
    itemElement.appendChild(createInnerText('p', 'Last Watched Episode:', 'text-lighter'));
    itemElement.appendChild(createEpisodesContainerItemInput());
    return itemElement;
}

// <div class="template__episodes-container center-horz"> </div>
export function createEpisodesContainer(items: EpisodesTemplateDataItem[]) {
    const container = createDivWithClasses('template__episodes-container', 'center-horz');
    items.forEach((item) => 
        container.appendChild(createEpisodesContainerItem(item)));
    return container;
}

export function createEpisodesTemplate(): SeriesTrackerTemplate {
    return {
        title: 'Episodes Template',
        id: 'episodes-template',
        newDefaultData() {
            return {
                templateID: 'episodes-template',
                data: {
                    items: new Array()
                }
            }
        },
        createTrackerContent(templateData: SeriesTrackerTemplateData) {
            const contentElement = document.createElement('ol');
            const parsed = episodesTemplateDataParser.parse(templateData.data);
            parsed.items.forEach((item) => 
                contentElement.appendChild(createSeriesTrackerItem(undefinedOrDefault(item.title, 'No Title'),
                                                                   'Episode ' + undefinedOrDefault(item.currentEpisode, 0))));
            return contentElement;
        },
        // <button class="small-singular action-button center-horz rounded-1">&plus;</button>
        // <div class="template__episodes-container center-horz"> </div>
        async decorateModalContent(trackerModalContent: HTMLElement, templateData: SeriesTrackerTemplateData) {
            const parsed = episodesTemplateDataParser.parse(templateData.data);
            const container = createEpisodesContainer(parsed.items);
            const buttonElement = createActionButton(createEpisodeButton);
            buttonElement.classList.add('center-horz');
            trackerModalContent.appendChild(buttonElement);
            buttonElement.onclick = () => {
                const containerItem = {};
                parsed.items.push(containerItem);
                container.appendChild(createEpisodesContainerItem(containerItem));
            };
            trackerModalContent.appendChild(container);
        }
    };
}

export const episodesTemplate = createEpisodesTemplate();
export const episodesTemplate2 = createEpisodesTemplate();
episodesTemplate2.id = 'abc';
episodesTemplate2.title = "ewdw wf wrfwfwefwfwwfwefwe fwddddddddddddddddddddddddddddddddcfecec ";