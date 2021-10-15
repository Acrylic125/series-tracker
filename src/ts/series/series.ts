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

export const seriesParser: Parser<Series> = {
    parse(data: any): Series {
        const { id, title, tags, colorStripColor, trackers } = data;
        const trackersArray: SeriesTracker[] = [];
        if (trackers instanceof Array) 
            trackers.forEach((tracker) => 
                trackersArray.push(seriesTrackerParser.parse(tracker)));
        return {
            id: (id) ? id : v4(),
            title: undefinedOrDefault(title, ''),
            tags: undefinedOrDefault(tags, []),
            trackers: trackersArray,
            colorStripColor: (colorStripColor && isStringValidHexColor(colorStripColor)) ? colorStripColor : randColorByShade(BRIGHT_SHADE).toPrefixedHex(),
            getIdentifiers() {
                return [ this.title, ...this.tags ];
            }
        };
    }
};

export type SeriesTrackerID = string;

export interface SeriesTracker {
    id: SeriesTrackerID
    title: string
    baseColor: string
    circleColor: string
    templates: SeriesTrackerTemplates
}

const seriesTrackerParser: Parser<SeriesTracker> = {
    parse(data: any): SeriesTracker {
        var { id, title, baseColor, circleColor } = data;
        if ((!baseColor || isStringValidHexColor(baseColor)) || (!circleColor || isStringValidHexColor(circleColor))) {
            const color = randColorByShade(DARK_SHADE);
            baseColor = color.toPrefixedHex();
            circleColor = color.clone().brighten(0.2).toPrefixedHex();
        }
        const templates = new SeriesTrackerTemplates();
        templates.addTemplateDataForTemplate(episodesTemplate, {
            templateID: episodesTemplate.id,
            items: []
        });
        return {
            id: (id) ? id : v4(),
            title: undefinedOrDefault(title, ''),
            baseColor, circleColor,
            templates
        };
    }
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
                title: "Season 2", currentEpisode: 24
            })
        ],
        tags: [],
        getIdentifiers() {
            return [ this.title, ...this.tags ];
        }
    }
}