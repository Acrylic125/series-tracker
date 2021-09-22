import { contextBridge } from 'electron';
import seriesStorage from './series/series-storage';

contextBridge.exposeInMainWorld('series', {
    getSeriesStorageMap: () => (seriesStorage.seriesMap)
});