import Dexie from 'dexie';
import { DB_NAME, schema, DB_VERSION } from '../constants';

const indexedDB =
  window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

export const isIndexedDBSupported = () => !!indexedDB;

const deviceLogIndexedDB = new Dexie(DB_NAME);

export const closeDeviceLogIndexedDB = () => deviceLogIndexedDB.close();

export const initLogsDb = () => {
  deviceLogIndexedDB.version(DB_VERSION).stores({
    devicelogs: schema.deviceLogs
  });
};

export default deviceLogIndexedDB;
