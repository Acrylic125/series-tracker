import { seriesTemplateRegistry } from "../../registry/registries";
import { episodesTemplate, episodesTemplate2 } from "./episodes-template";
import { SeriesTrackerTemplate } from "./series-tracker-template";

export function register(template: SeriesTrackerTemplate) {
    seriesTemplateRegistry.register(template.id, template);
}

export function registerAll(...templates: SeriesTrackerTemplate[]) {
    templates.forEach((template) => register(template));
}

registerAll(episodesTemplate, episodesTemplate2);
