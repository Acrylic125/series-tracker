import { app, contextBridge } from 'electron';
import seriesStorage from '../series/series-storage';
import contentStages from './content-stage-preload';
import './preload-imports';

contextBridge.exposeInMainWorld('contentStages', contentStages);
contextBridge.exposeInMainWorld('scripts', contentStages);
