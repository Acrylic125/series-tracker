import { readFile } from 'fs';

export class SeriesStorage {

    constructor(public collectionFilePath: string) {}

    public async getFileDataBuffer() {
        const buff = await new Promise<Buffer>((resolve) => {
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

const seriesCollection = new SeriesStorage("");
export default seriesCollection;
