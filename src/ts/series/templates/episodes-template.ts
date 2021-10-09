import { createSeriesTrackerItem } from "../../components/series-tracker/series-tracker-content-item";
import { Parser } from "../../utils/parser";
import { undefinedOrDefault } from "../../utils/utils";
import { SeriesTrackerTemplate, SeriesTrackerTemplateData } from "./series-tracker-template";

export interface EpisodesTemplateDataItem {
    title?: string
    currentEpisode?: number
}

export const episodesTemplateDataItemParser: Parser<EpisodesTemplateDataItem> = {
    id: 'episodes-data-item',
    parse(data) {
        return {
            title: data.title,
            currentEpisode: data.currentEpisode
        };
    }
};

export interface EpisodesTemplateData {
    items: EpisodesTemplateDataItem[]
}

export const episodesTemplateDataParser: Parser<EpisodesTemplateData> = {
    id: 'episodes-data',
    parse(data) {
        var items = new Array<EpisodesTemplateDataItem>();
        const itemsFromData = data.items;
        if (itemsFromData instanceof Array) {
            itemsFromData.forEach((item) => 
                items.push(episodesTemplateDataItemParser.parse(item)));
        }
        return { items };
    }
};

export function createEpisodesTemplate(): SeriesTrackerTemplate {
    return {
        id: 'episodes-template',
        createTrackerContent(templateData: SeriesTrackerTemplateData) {
            const contentElement = document.createElement('ol');
            
            const parsed = episodesTemplateDataParser.parse(templateData.data);
            parsed.items.forEach((item) => 
                contentElement.appendChild(createSeriesTrackerItem(undefinedOrDefault(item.title, 'No Title'),
                                                                   'Episode ' + undefinedOrDefault(item.currentEpisode, 0))));
            return contentElement;
        },
        async decorateModalContent(trackerModalContent: HTMLElement, templateData: SeriesTrackerTemplateData) {
            
        }
    };
}

export const episodesTemplate = createEpisodesTemplate();
