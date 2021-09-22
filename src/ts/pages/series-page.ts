import { htmlSeriesCard } from '../components/series-card';
import { Series } from '../series/series';
import seriesStorage from '../series/series-storage';

const SERIES_CARDS_ID = 'series-cards';

(async function updateContent() {
    const seriesCards = document.getElementById(SERIES_CARDS_ID);
    if (seriesCards) {
        seriesStorage.seriesMap.forEach((series) => 
            seriesCards.appendChild(document.createElement(htmlSeriesCard(series))));
    } else {
        console.error(`No element with id, ${SERIES_CARDS_ID}`);
    }
})();
