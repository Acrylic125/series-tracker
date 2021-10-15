import { v4 } from "uuid";
import { seriesTemplateRegistry } from "../registry/registries";
import { BRIGHT_SHADE, DARK_SHADE, isStringValidHexColor, randColorByShade } from "../utils/colors";
import { Parser } from "../utils/parser";
import { undefinedOrDefault } from "../utils/utils";
import { Series, SeriesTracker } from "./series";
import { SeriesTrackerTemplates } from "./templates/series-tracker-template";

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

const seriesTrackerParser: Parser<SeriesTracker> = {
    parse(data: any): SeriesTracker {
        var { id, title, baseColor, circleColor, templates } = data;
        if ((!baseColor || isStringValidHexColor(baseColor)) || (!circleColor || isStringValidHexColor(circleColor))) {
            const color = randColorByShade(DARK_SHADE);
            baseColor = color.toPrefixedHex();
            circleColor = color.clone().brighten(0.2).toPrefixedHex();
        }
        var templatesObject;
        if (templates)
            templatesObject = seriesTrackerTemplatesParser.parse(templates);
        else {
            templatesObject = new SeriesTrackerTemplates();
        }
        return {
            id: (id) ? id : v4(),
            title: undefinedOrDefault(title, ''),
            baseColor, circleColor,
            templates: templatesObject
        };
    }
}

const seriesTrackerTemplatesParser: Parser<SeriesTrackerTemplates> = {
    parse(data: any): SeriesTrackerTemplates {
        const { selectedTemplateID, templateDataMap } = data
        const templatesObject = new SeriesTrackerTemplates();
        templatesObject.selectedTemplateID = selectedTemplateID;
        if (templateDataMap) {
            for (const [templateID, data] of Object.entries(templateDataMap)) {
                const template = seriesTemplateRegistry.get(templateID);
                (template) && templatesObject.addTemplateDataForTemplate(template, template.templateDataParser.parse(data));
            }
        } 
        return templatesObject;
    }
}