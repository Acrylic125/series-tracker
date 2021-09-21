import { readFile } from 'fs';
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
            readFile(this.collectionFilePath, (err, data) => 
                resolve(data));
        });
        return buff;
    }

    public async getFileData() {
        return await JSON.parse((await this.getFileDataBuffer()).toString())
    }

    public async importSeries() {
        const data = await this.getFileData();
        
    }

    public async exportSeries() {
        await this.createFileIfNotExist();
        
    }

}

const seriesStorage = new SeriesStorage();
export default seriesStorage;

(async function testFileData() {
    console.log(await seriesStorage.getFileData());    
})();
