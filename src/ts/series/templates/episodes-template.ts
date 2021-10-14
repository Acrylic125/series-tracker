import { ActionButton, bindRightClickMenu, createActionButton, createDivWithClasses, createElementWithClasses, createInnerText } from "../../components/global-components";
import { createSeriesTrackerItem } from "../../components/series-tracker/series-tracker-content-item";
import { addTextAsHeightListener } from "../../components/modifiers/text-as-height";
import { Parser } from "../../utils/parser";
import { removeElementFromArray, shifElementtLeft, shifElementtRight, undefinedOrDefault } from "../../utils/utils";
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

export interface EpisodesTemplateData extends SeriesTrackerTemplateData {
    items: EpisodesTemplateDataItem[]
}

export function validateEpisodesTemplateData(data: EpisodesTemplateData) {
    if (!data.items)
        data.items = []; 
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
export function createEpisodesContainerItemTitle(title?: string) {
    const titleElement = 
    createElementWithClasses('textarea',
        'text-as-height', 
        'title',
        'input-focus-indicator',
        'no-border',
        'no-outline') as HTMLTextAreaElement;
    titleElement.placeholder = 'Title';
    if (title) 
        titleElement.value = title;
    addTextAsHeightListener(titleElement);
    return titleElement;
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
export function createEpisodesContainerItem(displayer: EpisodeContainerDisplayer, item: EpisodesTemplateDataItem) {
    const itemElement = createDivWithClasses('template__episodes-container-item', 'rounded-1');
    const titleElement = createEpisodesContainerItemTitle(item.title),
          currentEpisodeElement = createEpisodesContainerItemInput(item.currentEpisode);

    titleElement.addEventListener('input', () => item.title = (titleElement.value === '') ? undefined : titleElement.value);
    currentEpisodeElement.addEventListener('input', () => item.currentEpisode = (currentEpisodeElement.value) ? parseInt(currentEpisodeElement.value) : 0);

    itemElement.appendChild(titleElement);
    itemElement.appendChild(createInnerText('p', 'Last Watched\nEpisode:', 'text-lighter'));
    itemElement.appendChild(currentEpisodeElement);

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
    return itemElement;
}

export interface EpisodeContainerDisplayer {
    refresh(): Promise<void>
    items: EpisodesTemplateDataItem[]
    containerElement: HTMLElement
}

// <div class="template__episodes-container center-horz"> </div>
export function createEpisodesContainerDisplayer(items: EpisodesTemplateDataItem[]): EpisodeContainerDisplayer {
    const containerElement = createDivWithClasses('template__episodes-container', 'center-horz');
    const displayer = { containerElement, items, refresh };
    refresh();
    return displayer;

    async function refresh() {
        containerElement.innerHTML = '';
        items.forEach((item) => 
            containerElement.appendChild(createEpisodesContainerItem(displayer, item)));
    }
}

export function createEpisodesTemplate(): SeriesTrackerTemplate<EpisodesTemplateData> {
    return {
        title: 'Episodes Template',
        id: 'episodes-template',
        newDefaultData() {
            return {
                templateID: 'episodes-template',
                items: []
            }
        },
        createSeriesTrackerContent(templateData: EpisodesTemplateData) {
            validateEpisodesTemplateData(templateData);
            const contentElement = document.createElement('ol');
            templateData.items.forEach((item) => 
                contentElement.appendChild(createSeriesTrackerItem(undefinedOrDefault(item.title, 'No Title'),
                                                                   'Episode ' + undefinedOrDefault(item.currentEpisode, 0))));
            return contentElement;
        },
        // <button class="small-singular action-button center-horz rounded-1">&plus;</button>
        // <div class="template__episodes-container center-horz"> </div>
        async applyModalContent(trackerModalContent: HTMLElement, templateData: EpisodesTemplateData) {
            validateEpisodesTemplateData(templateData);
            const containerDisplayer = createEpisodesContainerDisplayer(templateData.items);
            const containerDisplayerElement = containerDisplayer.containerElement;
            const buttonElement = createActionButton(createEpisodeButton);
            buttonElement.classList.add('center-horz');
            trackerModalContent.appendChild(buttonElement);
            buttonElement.onclick = () => {
                const containerItem = {};
                validateEpisodesTemplateData(templateData);
                templateData.items.push(containerItem);
                containerDisplayerElement.appendChild(createEpisodesContainerItem(containerDisplayer, containerItem));
            };
            trackerModalContent.appendChild(containerDisplayerElement);
        }
    };
}

export const episodesTemplate = createEpisodesTemplate();
export const episodesTemplate2 = createEpisodesTemplate();
episodesTemplate2.id = 'abc';
episodesTemplate2.title = "ewdw wf wrfwfwefwfwwfwefwe fwddddddddddddddddddddddddddddddddcfecec ";