import { v4 } from 'uuid';
import { BRIGHT_SHADE, DARK_SHADE, isStringValidHexColor, randColorByShade } from '../utils/colors';
import { Filterable } from '../utils/filter';
import { Parser } from '../utils/parser';
import { undefinedOrDefault } from '../utils/utils';
import { episodesTemplate, EpisodesTemplateDataItem } from './templates/episodes-template';
import { SeriesTrackerTemplates } from './templates/series-tracker-template';

export type SeriesID = string;

export interface Series extends Filterable {
    title: string
    id: SeriesID
    tags: string[] // Tag IDs
    trackers: SeriesTracker[]
    colorStripColor: string
}

export type SeriesTrackerID = string;

export interface SeriesTracker {
    id: SeriesTrackerID
    title: string
    baseColor: string
    circleColor: string
    templates: SeriesTrackerTemplates
}

export function createTrackerWithEpisodesTemplate(title: string, ...items: EpisodesTemplateDataItem[]): SeriesTracker {
    const color = randColorByShade(DARK_SHADE);
    const templates = new SeriesTrackerTemplates();
    templates.addTemplateDataForTemplate(episodesTemplate, { items });
    templates.selectedTemplateID = episodesTemplate.id;
    return {
        id: v4(),
        title, templates,
        baseColor: color.toPrefixedHex(),
        circleColor: color.clone()
                          .brighten(0.2)
                          .toPrefixedHex()
    };
}

export function createNewSeries(title: string): Series {
    return {
        id: v4(),
        title,
        colorStripColor: randColorByShade(BRIGHT_SHADE).toPrefixedHex(),
        trackers: [ 
            createTrackerWithEpisodesTemplate('Seasons', {
                title: "Season 1", currentEpisode: 24
            }, {
                title: "Season 2", currentEpisode: 24
            })
        ],
        tags: [],
        getIdentifiers() {
            return [ this.title, ...this.tags ];
        }
    }
}