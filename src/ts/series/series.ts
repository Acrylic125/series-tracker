import { v4 } from 'uuid';
import { BRIGHT_SHADE, DARK_SHADE, randColorByShade } from '../utils/colors';
import { Filterable } from '../utils/filter';
import { createEpisodesTemplate, episodesTemplate, EpisodesTemplateDataItem } from './templates/episodes-template';
import { SeriesTrackerTemplates } from './templates/series-tracker-template';

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
    templateDataState: SeriesTrackerTemplates
}

export function createTracker(title: string, ...items: EpisodesTemplateDataItem[]): SeriesTracker {
    const color = randColorByShade(DARK_SHADE);
    const templateDataState = new SeriesTrackerTemplates(undefined);
    templateDataState.bindTemplateRawData(episodesTemplate, items);
    
    return {
        id: v4(),
        title, templateDataState,
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
        trackers: [ createTracker('Seasons', {}, {}) ],
        tags: [],
        getIdentifiers() {
            return [ this.title, ...this.tags ];
        }
    }
}