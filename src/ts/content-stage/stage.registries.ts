import { RegistryImpl } from "../utils/registry";
import { ContentStage } from "./content-stage";
import seriesCardsStage from "./stages/series-cards-stage";

const stageRegistry = new RegistryImpl<ContentStage>();
stageRegistry.register('series-cards', seriesCardsStage);

export default stageRegistry;