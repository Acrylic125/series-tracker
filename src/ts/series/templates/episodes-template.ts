import { SeriesTrackerTemplate, SeriesTrackerTemplateData } from "./series-tracker-template";

export function createEpisodesTemplate(): SeriesTrackerTemplate {
    return {
        id: 'episodes-template',
        decorateTrackerDisplay(trackerDisplay: HTMLElement, templateData: SeriesTrackerTemplateData) {
            
        },
        decorateModalContent(trackerModalContent: HTMLElement, templateData: SeriesTrackerTemplateData) {

        }
    };
}

