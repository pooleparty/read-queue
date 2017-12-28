import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';
import {
  getChromeQueue,
  clearChromeQueue,
  addAndSaveQueue,
  removeTabAndSaveQueue,
  findImportDuplicates,
  importEntries,
} from '../utils/queue';

export const ADD_TAB_TO_QUEUE = 'ADD_TAB_TO_QUEUE';
export const ADD_TAB_TO_QUEUE_PENDING = `${ADD_TAB_TO_QUEUE}_${PENDING}`;
export const ADD_TAB_TO_QUEUE_FULFILLED = `${ADD_TAB_TO_QUEUE}_${FULFILLED}`;
export const ADD_TAB_TO_QUEUE_REJECTED = `${ADD_TAB_TO_QUEUE}_${REJECTED}`;

export function addTabToQueue(tab) {
  const { url, title } = tab;
  return {
    type: ADD_TAB_TO_QUEUE,
    payload: addAndSaveQueue({ url, title }),
  };
}

export const GET_QUEUE = 'GET_QUEUE';
export const GET_QUEUE_PENDING = `${GET_QUEUE}_${PENDING}`;
export const GET_QUEUE_FULFILLED = `${GET_QUEUE}_${FULFILLED}`;
export const GET_QUEUE_REJECTED = `${GET_QUEUE}_${REJECTED}`;

export function getQueue() {
  return {
    type: GET_QUEUE,
    payload: getChromeQueue(),
  };
}

export const CLEAR_QUEUE = 'CLEAR_QUEUE';
export const CLEAR_QUEUE_PENDING = `${CLEAR_QUEUE}_${PENDING}`;
export const CLEAR_QUEUE_FULFILLED = `${CLEAR_QUEUE}_${FULFILLED}`;
export const CLEAR_QUEUE_REJECTED = `${CLEAR_QUEUE}_${REJECTED}`;

export function clearQueue() {
  return {
    type: CLEAR_QUEUE,
    payload: clearChromeQueue(),
  };
}

export const PROCESS_IMPORT_QUEUE = 'PROCESS_IMPORT_QUEUE';
export const PROCESS_IMPORT_QUEUE_PENDING = `${PROCESS_IMPORT_QUEUE}_${PENDING}`;
export const PROCESS_IMPORT_QUEUE_FULFILLED = `${PROCESS_IMPORT_QUEUE}_${FULFILLED}`;
export const PROCESS_IMPORT_QUEUE_REJECTED = `${PROCESS_IMPORT_QUEUE}_${REJECTED}`;

export function processImportQueue(imported) {
  return {
    type: PROCESS_IMPORT_QUEUE,
    payload: findImportDuplicates(imported),
  };
}

export const IMPORT_QUEUE_ENTRIES = 'IMPORT_QUEUE';
export const IMPORT_QUEUE_ENTRIES_PENDING = `${IMPORT_QUEUE_ENTRIES}_${PENDING}`;
export const IMPORT_QUEUE_ENTRIES_FULFILLED = `${IMPORT_QUEUE_ENTRIES}_${FULFILLED}`;
export const IMPORT_QUEUE_ENTRIES_REJECTED = `${IMPORT_QUEUE_ENTRIES}_${REJECTED}`;

export function importQueueEntries(entries) {
  return {
    type: IMPORT_QUEUE_ENTRIES,
    payload: importEntries(entries),
  };
}

export const REMOVE_TAB_FROM_QUEUE = 'REMOVE_TAB_FROM_QUEUE';
export const REMOVE_TAB_FROM_QUEUE_PENDING = `${REMOVE_TAB_FROM_QUEUE}_${PENDING}`;
export const REMOVE_TAB_FROM_QUEUE_FULFILLED = `${REMOVE_TAB_FROM_QUEUE}_${FULFILLED}`;
export const REMOVE_TAB_FROM_QUEUE_REJECTED = `${REMOVE_TAB_FROM_QUEUE}_${REJECTED}`;

export function removeTabFromQueue(tabId) {
  return {
    type: REMOVE_TAB_FROM_QUEUE,
    payload: removeTabAndSaveQueue(tabId),
  };
}
