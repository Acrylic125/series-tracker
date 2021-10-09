import { Parser } from "../../utils/parser";
import { SeriesTrackerTemplate, SeriesTrackerTemplateData } from "./series-tracker-template";

export interface EpisodesTemplateDataItem {
    title?: string
    currentEpisode?: number
}

export interface EpisodesTemplateData {
    items: EpisodesTemplateDataItem[]
}

export const episodesTemplateDataParser: Parser<EpisodesTemplateData> = {
    id: 'episodes-data',
    async parse(data) {
        var items = new Array<EpisodesTemplateDataItem>();
        const itemsFromData = data.items;
        if (itemsFromData instanceof Array) {
            itemsFromData.forEach((item) => 
                items.push({
                    title: item.title,
                    currentEpisode: item.currentEpisode
                }));
        }
        return { items };
    }
};

export function createEpisodesTemplate(): SeriesTrackerTemplate {
    return {
        id: 'episodes-template',
        async decorateTrackerDisplay(trackerDisplay: HTMLElement, templateData: SeriesTrackerTemplateData) {
            const parsed = await episodesTemplateDataParser.parse(templateData.data);
            
        },
        async decorateModalContent(trackerModalContent: HTMLElement, templateData: SeriesTrackerTemplateData) {

        }
    };
}
