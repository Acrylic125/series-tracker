import { SeriesTrackerContentItem } from "./series-tracker";

export class SeriesTrackerContentStatus implements SeriesTrackerContentItem {
    constructor(public title: string) {}

    public toComponent(): HTMLElement {
        
    }
}