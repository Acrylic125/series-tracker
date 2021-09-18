import { Component, SerializableComponent } from "./component";

export class SeriesCardColorStrip 
        implements Component, SerializableComponent {
    toHTML(): string {
        return "";
    }

    serialize(): any {

    }

    static deserialize(m: any): SeriesCardColorStrip {
        return new SeriesCardColorStrip();
    }
}