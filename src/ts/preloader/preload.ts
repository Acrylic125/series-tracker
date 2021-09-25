import { contextBridge } from 'electron';
import contentStages from './content-stage-preload';

contextBridge.exposeInMainWorld('contentStages', contentStages);