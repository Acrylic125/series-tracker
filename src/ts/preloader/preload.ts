import { contextBridge } from 'electron';
import contentStages from './content-stage-preload';
import './preload-imports';

contextBridge.exposeInMainWorld('contentStages', contentStages);
contextBridge.exposeInMainWorld('scripts', contentStages);