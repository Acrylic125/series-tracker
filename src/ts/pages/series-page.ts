// import { htmlSeriesCard } from '../components/series-card';
// import seriesStorage from '../series/series-storage';

// const SERIES_CARDS_ID = 'series-cards';

// console.log("TENDDJEE");
    
// (async function updateContent() {
//     const seriesCards = document.getElementById(SERIES_CARDS_ID);
//     if (seriesCards) {
//         seriesCards.innerHTML = '';
//         seriesStorage.seriesMap.forEach((series) => 
//             seriesCards.appendChild(
//                 document.createElement(htmlSeriesCard(series))
//             )
//         );
//     } else {
//         console.error(`No element with id, ${SERIES_CARDS_ID}`);
//     }
// })();

import { ipcRenderer } from 'electron';
