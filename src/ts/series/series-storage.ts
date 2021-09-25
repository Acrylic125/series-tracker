import fs from 'fs';
import { randColor, BRIGHT_DEFAULT } from '../utils/colors';
import { createFileIfNotExist, JSON_FILE_CREATION_OPTIONS } from '../utils/utils';
import { Series } from './series';

export class SeriesStorage {

    constructor(public collectionFilePath: string = "D:\\apps\\test.json",
                public seriesMap: Map<string, Series> = new Map()) {}

    private async createFileIfNotExist() {
        await createFileIfNotExist(this.collectionFilePath, JSON_FILE_CREATION_OPTIONS);
    }

    public async getFileDataBuffer() {
        const buff = await new Promise<Buffer>(async (resolve) => {
            await this.createFileIfNotExist();
            fs.readFile(this.collectionFilePath, (err, data) => 
                resolve(data));
        });
        return buff;
    }

    public async getFileData() {
        return await JSON.parse((await this.getFileDataBuffer()).toString())
    }

    public async importSeries() {
        const data = await this.getFileData();
        const series = data['series'];
        if (series) {
            
        }
    }

    public async saveToFile() {
        await this.createFileIfNotExist();
        var data = {
            series: Object.fromEntries(this.seriesMap)
        };
        await fs.promises.writeFile(this.collectionFilePath, JSON.stringify(data, null, 4));
    }

}

const seriesStorage = new SeriesStorage();
for (let i = 0; i < 10; i++) {
    seriesStorage.seriesMap.set('abc-' + i, {
        id: "abca-" + i,
        title: "A REALLY long title " + i,
        colorStripColor: `#${randColor(BRIGHT_DEFAULT)}`,
        items: [],
        tags: []
    });
}
seriesStorage.saveToFile();

export default seriesStorage;

