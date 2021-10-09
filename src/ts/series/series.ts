import { v4 } from 'uuid';
import { BRIGHT_SHADE, DARK_SHADE, randColorByShade } from '../utils/colors';
import { Filterable } from '../utils/filter';
import { SeriesTrackerTemplateDataMap } from './templates/series-tracker-template';

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
    templateDataMap: SeriesTrackerTemplateDataMap
}

export function createTracker(title: string, items:): SeriesTracker {
    const color = randColorByShade(DARK_SHADE);
    return {
        id: v4(),
        title, templateDataMap: new SeriesTrackerTemplateDataMap(),
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
        colorStripColor: randColorByShade(BRIGHT_SHADE).toPrefixedHex(),
        trackers: [],
        tags: [],
        getIdentifiers() {
            return [ this.title, ...this.tags ];
        }
    }
}