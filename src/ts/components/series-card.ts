import { Component } from "./component";

export class SeriesCardColorStrip 
        implements Component {

    constructor(public color: string) {}

    toHTML(): string {
        return `<span class="series-card__color-strip" style="background-color: #${this.color};"></span>`;
    }

}

export class SeriesCardTitle
        implements Component {

    constructor(public title: string) {}

    toHTML(): string {
        return `<p class="series-card__title p-3 font-weight-bold">
                    ${this.title}
                </p>`;
    }

}

export class SeriesCard 
        implements Component {
    
    constructor(public colorStrip: SeriesCardColorStrip, 
                public title: SeriesCardTitle) {}

    toHTML(): string {
        return `<div class="series-card my-2">
                    ${this.colorStrip.toHTML()}
                    ${this.title.toHTML()}
                </div>`;
    }

}