import { v4 } from 'uuid';
import { SeriesTrackerContentItem } from '../components/series-tracker/series-tracker-content-item';
import { SeriesTrackerContentItemStatus } from "../components/series-tracker/series-tracker-content-item-status";
import { BRIGHT_SHADE, DARK_SHADE, randColorByShade } from '../utils/colors';
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

export function createTracker(title: string, ...items: SeriesTrackerContentItem[]): SeriesTracker {
    const color = randColorByShade(DARK_SHADE);
    return {
        id: v4(),
        title, items,
        baseColor: color.toPrefixedHex(),
        circleColor: color.clone()
                          .brighten(0.2)
                          .toPrefixedHex()
    };
}

export function createDummy(title: string): Series {
    // const colors = randColorsSameCase(BRIGHT_DEFAULT, DARK_DEFAULT);
    return {
        id: v4(),
        title: "A REALLY long title " + title,
        colorStripColor: randColorByShade(BRIGHT_SHADE).toPrefixedHex('#'),
        trackers: [
            createTracker("Seasons", new SeriesTrackerContentItemStatus("Season 1", "Episode 24"), 
                                     new SeriesTrackerContentItemStatus("Season 2", "Episode 24"),
                                     new SeriesTrackerContentItemStatus("Season 3", "Episode 24")),
            createTracker("Movies", new SeriesTrackerContentItemStatus("Whatever long title I can think of", "Episode 24")),
            createTracker("OVAS", new SeriesTrackerContentItemStatus("OVA 1", "Episode 24"), 
                                     new SeriesTrackerContentItemStatus("OVA 2", "Episode 4"),),
            createTracker("Specials", new SeriesTrackerContentItemStatus("Special 1", "Episode 1"), 
                                     new SeriesTrackerContentItemStatus("Special 2", "Episode 1"),
                                     new SeriesTrackerContentItemStatus("Special 3", "Episode 1")),
            createTracker("Diary", new SeriesTrackerContentItemStatus("Diary 1", "Episode 4"), ),
        ],
        tags: [],
        getIdentifiers() {
            return [ this.title, ...this.tags ]
        }
    }
}