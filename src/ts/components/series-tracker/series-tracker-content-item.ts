import { Component } from "../component";
import { createElementWithClasses } from "../global-components";

export interface SeriesTrackerContentItem<T extends HTMLElement = HTMLElement>
         extends Component<T> {
    title: string
}

// <p class="series-tracker__content-item--title"> </p>
export function createSeriesTrackerContentItemTitle(title: string) {
    const titleElement = createElementWithClasses('p', 'series-tracker__content-item--title');
    titleElement.innerText = title;
    return titleElement;
}