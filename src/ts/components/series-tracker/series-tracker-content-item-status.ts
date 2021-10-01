import { createSeriesTrackerContentItemTitle, SeriesTrackerContentItem } from "./series-tracker-content-item";

export class SeriesTrackerContentItemStatus implements SeriesTrackerContentItem {
    constructor(public title: string,
                public status: string) {}
    
    public toComponent(): HTMLElement {
        const component = document.createElement('li');
        component.appendChild(createSeriesTrackerContentItemTitle(this.title));
        component.appendChild(createSeriesTrackerContentItemStatus(this.status));
        return component;
    }
}

// <p class="series-tracker__content-item--status"> </p>
export function createSeriesTrackerContentItemStatus(status: string) {
    const statusElement = document.createElement('p');
    statusElement.innerText = status;
    statusElement.classList.add('series-tracker__content-item--status');
    return statusElement;
}
