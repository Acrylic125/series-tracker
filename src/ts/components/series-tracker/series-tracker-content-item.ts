import { Component } from "../component";
import { createInnerText } from "../global-components";

export interface SeriesTrackerContentItem<T extends HTMLElement = HTMLElement>
         extends Component<T> {
    id: string
    title: string
}

// <p class="series-tracker__content-item--title"> </p>
export function createSeriesTrackerContentItemTitle(title: string) {
    return createInnerText('p', title, 'series-tracker__content-item--title');
}