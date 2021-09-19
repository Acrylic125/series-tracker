import { readFile } from 'fs';

export class SeriesCollection {

    constructor(public collectionFilePath: string) {}

    public async getStoredSeries() {
        readFile(this.collectionFilePath, (err, data) => {
                
        });
    }

}

const seriesCollection = new SeriesCollection("");
export default seriesCollection;
