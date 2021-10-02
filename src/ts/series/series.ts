import { v4 } from 'uuid';
import { SeriesTrackerContentItem } from '../components/series-tracker/series-tracker-content-item';
import { SeriesTrackerContentItemStatus } from "../components/series-tracker/series-tracker-content-item-status";
import { BRIGHT_DEFAULT, DARK_DEFAULT, randColor, randColorsSameCase } from '../utils/colors';
import { Filterable } from '../utils/filter';

export interface Series extends Filterable {
    title: string
    id: string
    tags: string[] // Tag IDs
    trackers: SeriesTracker[]
    colorStripColor: string
}

export interface SeriesTracker {
    id: string
    title: string
    baseColor: string
    circleColor: string
    items: SeriesTrackerContentItem[]
}

export function createDummy(title: string): Series {
    // const colors = randColorsSameCase(BRIGHT_DEFAULT, DARK_DEFAULT);
    return {
        id: v4(),
        title: "A REALLY long title " + title,
        colorStripColor: `#${randColor(BRIGHT_DEFAULT)}`,
        trackers: [
            {
                id: v4(),
                title: "Seasons",
                baseColor: `#${randColor(BRIGHT_DEFAULT)}`,
                circleColor: `#${randColor(DARK_DEFAULT)}`,
                items: [
                    new SeriesTrackerContentItemStatus("Season 1", "Episode 3"),
                    new SeriesTrackerContentItemStatus("Season 2", "Episode 3"),
                    new SeriesTrackerContentItemStatus("Season 3", "Episode 3")
                ]
            },
            {
                id: v4(),
                title: "Movies",
                baseColor: `#${randColor(BRIGHT_DEFAULT)}`,
                circleColor: `#${randColor(DARK_DEFAULT)}`,
                items: [
                    new SeriesTrackerContentItemStatus("Season 1", "Episode 3"),
                ]
            },
            {
                id: v4(),
                title: "OVAs",
                baseColor: `#${randColor(BRIGHT_DEFAULT)}`,
                circleColor: `#${randColor(DARK_DEFAULT)}`,
                items: [
                    new SeriesTrackerContentItemStatus("A really weird title", "Episode 4"),
                ]
            },
            {
                id: v4(),
                title: "Specials",
                baseColor: `#${randColor(BRIGHT_DEFAULT)}`,
                circleColor: `#${randColor(DARK_DEFAULT)}`,
                items: [
                    new SeriesTrackerContentItemStatus("A really weird title", "Episode 4"),
                ]
            },
            {
                id: v4(),
                title: "Specials",
                baseColor: `#${randColor(BRIGHT_DEFAULT)}`,
                circleColor: `#${randColor(DARK_DEFAULT)}`,
                items: [
                    new SeriesTrackerContentItemStatus("A really weird title", "Episode 4"),
                ]
            },
            {
                id: v4(),
                title: "Specials",
                baseColor: `#${randColor(BRIGHT_DEFAULT)}`,
                circleColor: `#${randColor(DARK_DEFAULT)}`,
                items: [
                    new SeriesTrackerContentItemStatus("A really weird title", "Episode 4"),
                ]
            }
        ],
        tags: [],
        getIdentifiers() {
            return [ this.title, this.id, ...this.tags ]
        }
    }
}