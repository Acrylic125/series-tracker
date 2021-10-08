import { stageRegistry } from "../registry/registries";
import seriesCardsStage from "./stages/series-cards-stage";

stageRegistry.register('series-cards', seriesCardsStage);
