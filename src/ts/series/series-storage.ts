import { readFile } from 'fs';
import { createFileIfNotExist } from '../utils/utils';

export class SeriesStorage {

    constructor(public collectionFilePath: string = "C:\\Users\\bened\\Desktop\\ent\\test.json") {}

    public async getFileDataBuffer() {
        const buff = await new Promise<Buffer>(async (resolve) => {
            await createFileIfNotExist(this.collectionFilePath, {
                defaultContent: '{}'
            });
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

}

const seriesStorage = new SeriesStorage();
export default seriesStorage;

(async function testFileData() {
    console.log(await seriesStorage.getFileData());    
})();
