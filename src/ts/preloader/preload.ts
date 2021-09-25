import { contextBridge } from 'electron';
import seriesStorage from '../series/series-storage';
import contentStagePreload from './content-stage-preload';

contextBridge.exposeInMainWorld('series', {
    contentStagePreload
});