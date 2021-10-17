import { createInnerText, createTag, createTagCollection, Tag } from "../global-components";

// <p class="series-tracker__content-item--title"> </p>
export function createSeriesTrackerContentItemTitle(title: string) {
    return createInnerText('p', (title) ? title : 'No Title', 'series-tracker__content-item--title');
}

// <p class="series-tracker__content-item--status"> </p>
export function createSeriesTrackerContentItemStatus(status: string) {
    return createInnerText('p', status, 'series-tracker__content-item--status');
}

export function createSeriesTrackerItem(title: string, status: string) {
    const itemElement = document.createElement('li');
    itemElement.appendChild(createSeriesTrackerContentItemTitle(title));
    itemElement.appendChild(createSeriesTrackerContentItemStatus(status));
    return itemElement;
}

export function createSeriesTrackerItemWithTag(title: string, tag: Tag) {
    const itemElement = document.createElement('li');
    itemElement.appendChild(createSeriesTrackerContentItemTitle(title));
    itemElement.appendChild(createTagCollection(tag));
    return itemElement;
}