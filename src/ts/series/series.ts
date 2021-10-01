import { SeriesTrackerContentItem } from '../components/series-tracker/series-tracker-content-item';
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
    content: SeriesTrackerContent
}

export interface SeriesTrackerContent {
    title: string
    items: SeriesTrackerContentItem[]
}
