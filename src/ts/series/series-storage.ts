import fs from 'fs';
import { keyboardShortcutListener, KEY_CTRL } from '../html-loaded/keyboard-shortcut';
import { createFileIfNotExist, JSON_FILE_CREATION_OPTIONS } from '../utils/utils';
import { Series } from './series';
import { seriesParser } from './series-parser';

const STORE_COMPRESSED = 1;
const STORE_READ = 2;

const storageMode: number = STORE_READ;

export class SeriesStorage {

    private readyToSave = true;

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
            for (const [seriesID, seriesData] of Object.entries(series)) 
                this.seriesMap.set(seriesID, seriesParser.parse(seriesData));
        }
    }

    public async saveToFile() {
        if (!this.readyToSave)
            return;
        this.readyToSave = false;
        await this.createFileIfNotExist();
        var data = {
            series: Object.fromEntries(this.seriesMap)
        };
        await fs.promises.writeFile(this.collectionFilePath, SeriesStorage.toStoredData(data));
        this.readyToSave = true;
    }

    public static toStoredData(data: any) {
        switch (storageMode) {
            case STORE_COMPRESSED:
                return JSON.stringify(data);
            case STORE_READ:
                return JSON.stringify(data, null, 4);
            default:
                return data;
        }
    } 

}

const seriesStorage = new SeriesStorage();
// for (let i = 0; i < 3; i++) {
//     const dummy = createDummy("test-" + i);
//     seriesStorage.seriesMap.set(dummy.id, dummy);
// }
// seriesStorage.saveToFile();

(async function initStorage() {
    
    await seriesStorage.importSeries();
    autoSave();

    async function autoSave() {
        await seriesStorage.saveToFile();
        setTimeout(autoSave, 5000);
    }
})();

keyboardShortcutListener.shortcuts.push({
    keys: ['s', KEY_CTRL],
    callback: () => seriesStorage.saveToFile()
})

export default seriesStorage;

