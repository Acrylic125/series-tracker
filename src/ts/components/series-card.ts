import { Component } from "./component";

export class SeriesCardColorStrip 
        implements Component {

    constructor(public color: string) {}

    toHTML(): string {
        return "";
    }

}

export class SeriesCardTitle
        implements Component {

    constructor(public text: string) {}

    toHTML(): string {
        return "";
    }

}


export class SeriesCard 
        implements Component {
    
    constructor(public colorStrip: SeriesCardColorStrip, 
                public title: SeriesCardTitle) {}

    toHTML(): string {
        return "";
    }

}