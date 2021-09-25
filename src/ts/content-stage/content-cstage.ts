import { Series } from "../series/series";
import { ContentStage } from "./content-stage";

//         <div class="series-card">
//           <span class="series-card__color-strip"></span>
//           <span class="series-card__content">
//             <p class="series-card__content--title">
//               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, facilis.
//             </p>
//             <ol class="series-card__content--tags">
//               <li class="series-card__tag">
//                 test
//               </li>
//               <li class="series-card__tag">
//                 Lorem, ipsum dolor.
//               </li>
//             </ol>
//           </span>
//         </div>

export function createSeriesCardColorStrip(document: Document, color: string) {
    
}

export function createSeriesCardTitle(document: Document, title: string) {
    
}

export function createSeriesCardTags(document: Document, title: string) {
    
}

export function createSeriesCard(document: Document, series: Series) {
    
}

const contentCStage: ContentStage = {
    content(document: Document): HTMLElement {

    }
}

export default contentCStage;