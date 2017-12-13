import { v4 as uuid } from 'node-uuid';

const STORAGE_KEY_QUEUE = 'STORAGE_KEY_QUEUE';

export function getChromeQueue() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(STORAGE_KEY_QUEUE, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        const queue = result[STORAGE_KEY_QUEUE];
        chrome.browserAction.setBadgeText({ text: queue.length.toString() });
        resolve(queue);
      }
    });
  });
}

export function saveChromeQueue(queue) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [STORAGE_KEY_QUEUE]: queue }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        chrome.browserAction.setBadgeText({ text: queue.length.toString() });
        resolve(queue);
      }
    });
  });
}

export function clearChromeQueue() {
  return saveChromeQueue([]);
}

export async function addAndSaveQueue(tab) {
  // get queue
  const queue = await getChromeQueue();
  // add tab to queue
  queue.push({ id: uuid(), dateAdded: new Date().toISOString(), ...tab });
  // save queue
  await saveChromeQueue(queue);
  // return queue
  return queue;
}

export async function removeTabAndSaveQueue(tabId) {
  // get queue
  const queue = await getChromeQueue();
  // filter tab from queue
  const newQueue = queue.filter(item => item.id !== tabId);
  // save new queue
  await saveChromeQueue(newQueue);
  // return new queue
  return newQueue;
}

export function getActiveTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(tabs[0]);
      }
    });
  });
}
