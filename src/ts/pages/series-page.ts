const SERIES_CARDS_ID = 'series-cards';
const SERIES_CARD_COLOR_STRIP = 'series-card__color-strip';
const SERIES_CARD_TITLE = 'series-card__title';

function newSeriesCard(ser: any, template: HTMLTemplateElement): Node {
    const seriesCard = template.content.firstElementChild?.cloneNode(true);
    const { colorStripColor, title } = ser;
    if (seriesCard) {
        if (seriesCard instanceof HTMLElement) {
            seriesCard.querySelectorAll(SERIES_CARD_COLOR_STRIP)
                .forEach((colorStripElement) => {
                    if (colorStripElement instanceof HTMLElement) 
                        colorStripElement.style.backgroundColor = colorStripColor;
                });
            seriesCard.querySelectorAll(SERIES_CARD_TITLE)
                .forEach((titleElement) => {
                    if (titleElement instanceof HTMLElement) 
                        titleElement.innerText = title;
                });
        }
        return seriesCard;
    } else {
        throw Error(`${template} failed to be replicated from.`);
    }
}

(async function updateContent() {
    const seriesCards = document.getElementById(SERIES_CARDS_ID);
    if (seriesCards) {
        const cardTemplateID = seriesCards.dataset.cardtemplate;
        // Validation 
        if (!cardTemplateID) {
            console.error(`No data-cardTemplate specified in the series card.`);
            return;
        }
        const cardTemplate = document.getElementById(cardTemplateID);
        if (!(cardTemplate instanceof HTMLTemplateElement)) {
            console.error(`Card template, ${cardTemplate} is not a template element.`);
            return;
        }
        if (!cardTemplate.content.firstElementChild) {
            console.error(`Card template ${cardTemplate}, has no children/object to replicate from.`);
            return;
        }

        seriesCards.innerHTML = '';
        (series.getSeriesStorageMap() as Map<string, any>).forEach((ser) => 
            seriesCards.appendChild(
                newSeriesCard(ser, cardTemplate)
            )
        );
    } else {
        console.error(`No element with id, ${SERIES_CARDS_ID}`);
    }
})();


var series: any;
