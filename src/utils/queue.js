import { v4 as uuid } from 'node-uuid';
import find from 'lodash/find';

const STORAGE_KEY_QUEUE = 'STORAGE_KEY_QUEUE';

export function getChromeQueue() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(STORAGE_KEY_QUEUE, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        const queue = result[STORAGE_KEY_QUEUE];
        chrome.browserAction.setBadgeText({
          text: queue.length.toString(),
        });
        resolve(queue);
      }
    });
  });
}

export function saveChromeQueue(queue) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(
      {
        [STORAGE_KEY_QUEUE]: queue,
      },
      () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          chrome.browserAction.setBadgeText({
            text: queue.length.toString(),
          });
          resolve(queue);
        }
      },
    );
  });
}

export function clearChromeQueue() {
  return saveChromeQueue([]);
}

export async function findImportDuplicates(imported = []) {
  const queue = await getChromeQueue();

  const entries = imported.map((item) => {
    const isDuplicate = !!find(
      queue,
      queueItem => item.id === queueItem.id || item.url === queueItem.url,
    );
    return { isDuplicate, ...item };
  });
  return entries;
}

function getTitle(input) {
  const title = input.match(/<title[^>]*>([^<]+)<\/title>/);
  if (title) {
    return title[1];
  }
  return undefined;
}

function followRedirects({ url, title }) {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve();
    } else {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const resolvedUrl = xhr.responseURL || url;
          const resolvedTitle = getTitle(xhr.responseText) || title;
          resolve({
            url: resolvedUrl,
            title: resolvedTitle,
          });
        }
      };
      xhr.open('GET', url, true);
      try {
        xhr.send();
      } catch (e) {
        reject(e);
      }
    }
  });
}

async function createQueueEntry(item) {
  const { url, title } = await followRedirects(item);

  return {
    id: uuid(),
    dateAdded: new Date().toISOString(),
    url,
    title,
  };
}

export async function importEntries(entries) {
  const queue = await getChromeQueue();

  const imported = await Promise.all(entries.map(createQueueEntry));

  const newQueue = queue.concat(imported);

  return saveChromeQueue(newQueue);
}

export async function addAndSaveQueue(tab) {
  const queue = await getChromeQueue();

  const item = await createQueueEntry(tab);

  const newQueue = queue.concat(item);

  return saveChromeQueue(newQueue);
}

export async function removeTabAndSaveQueue(tabId) {
  const queue = await getChromeQueue();

  const newQueue = queue.filter(item => item.id !== tabId);

  return saveChromeQueue(newQueue);
}

export function getActiveTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(
      {
        active: true,
      },
      (tabs) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(tabs[0]);
        }
      },
    );
  });
}

export function addQueueChangeListener(callback) {
  chrome.storage.onChanged.addListener((changes) => {
    const queueChange = changes[STORAGE_KEY_QUEUE];
    callback(queueChange.oldValue, queueChange.newValue);
  });
}
