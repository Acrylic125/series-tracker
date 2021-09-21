import fs from 'fs';
import { createFileIfNotExist, JSON_FILE_CREATION_OPTIONS } from '../utils/utils';
import { Series } from './series';

export class SeriesStorage {

    constructor(public collectionFilePath: string = "C:\\Users\\bened\\Desktop\\ent\\test.json",
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
        fs.promises.writeFile(this.collectionFilePath, JSON.stringify(data, null, 4));
    }

}

const seriesStorage = new SeriesStorage();
export default seriesStorage;

(async function testFileData() {
    console.log(await seriesStorage.getFileData());    
})();
