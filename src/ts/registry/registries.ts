import { ContentStage } from "../content-stage/content-stage";
import { SeriesTrackerTemplate } from "../series/templates/series-tracker-template";
import { RegistryImpl } from "./registry";

export const stageRegistry = new RegistryImpl<ContentStage>();
export const seriesTemplateRegistry = new RegistryImpl<SeriesTrackerTemplate>();
