import { v4 } from 'uuid';
import { BRIGHT_SHADE, DARK_SHADE, randColorByShade } from '../utils/colors';
import { Filterable } from '../utils/filter';
import { episodesTemplate, EpisodesTemplateData, EpisodesTemplateDataItem } from './templates/episodes-template';
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
    templates: SeriesTrackerTemplates
}

export function createTracker(title: string, ...items: EpisodesTemplateDataItem[]): SeriesTracker {
    const color = randColorByShade(DARK_SHADE);
    const templates = new SeriesTrackerTemplates();
    templates.addTemplateDataForTemplate(episodesTemplate, {
        templateID: episodesTemplate.id,
        items
    });
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

export function createDummy(title: string): Series {
    // const colors = randColorsSameCase(BRIGHT_DEFAULT, DARK_DEFAULT);
    return {
        id: v4(),
        title: "A REALLY long title " + title,
        colorStripColor: randColorByShade(BRIGHT_SHADE).toPrefixedHex(),
        trackers: [ 
            createTracker('Seasons', {
                title: "Season 1", currentEpisode: 24
            }, {
                title: "Season 2", currentEpisode: 12
            }, {
                title: "Season 2 part 2", currentEpisode: 12
            }),
            createTracker('OVAs', {
                title: "Season 1", currentEpisode: 3
            }, {
                title: "Season 2", currentEpisode: 3
            }),
            createTracker('Movies', {
                title: "A really long title lol Idk why but whatever", currentEpisode: 3
            }),
            createTracker('Specials', {
                title: "Special 1 - WHatever", currentEpisode: 3
            }, {
                title: "Special 2 - Another Title", currentEpisode: 3
            }),
            createTracker('Diary', {
                title: "Diary 1", currentEpisode: 12
            }),
        ],
        tags: [],
        getIdentifiers() {
            return [ this.title, ...this.tags ];
        }
    }
}