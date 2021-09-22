import { Series } from "../series/series";

export function htmlSeriesCardColorStrip(color: string) {
    return `<span class="series-card__color-strip" style="background-color: #${color};"></span>`;
}

export function htmlSeriesCardTitle(title: string) {
    return `<p class="series-card__title p-3 font-weight-bold">
                ${title}
            </p>`;
}

export function htmlSeriesCard(series: Series): string {
    return `<div class="series-card my-2">
                ${htmlSeriesCardColorStrip(series.colorStripColor)}
                ${htmlSeriesCardTitle(series.title)}
            </div>`;
}