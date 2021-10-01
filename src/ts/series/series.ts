import { SeriesTrackerContentItem } from '../components/series-tracker/series-tracker-content-item';
import { BRIGHT_DEFAULT, randColor } from '../utils/colors';
import { Filterable } from '../utils/filter';

export interface Series extends Filterable {
    title: string
    id: string
    tags: string[] // Tag IDs
    trackers: SeriesTracker[]
    colorStripColor: string
}

export interface SeriesTracker {
    title: string
    baseColor: string
    content: SeriesTrackerContent
}

export interface SeriesTrackerContent {
    title: string
    items: SeriesTrackerContentItem[]
}

export function createDummy(id: string) {
    return {
        id: id,
        title: "A REALLY long title " + id,
        colorStripColor: `#${randColor(BRIGHT_DEFAULT)}`,
        trackers: [],
        tags: [],
        getIdentifiers() {
            return [ this.title, this.id, ...this.tags ]
        }
    }
}