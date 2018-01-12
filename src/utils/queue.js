import { v4 as uuid } from 'node-uuid';

const STORAGE_KEY_QUEUE = 'STORAGE_KEY_QUEUE';

export function getChromeQueue() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(STORAGE_KEY_QUEUE, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        const queue = result[STORAGE_KEY_QUEUE] || [];
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
    if (!Array.isArray(queue)) {
      return reject('Queue must be an Array');
    }

    chrome.storage.sync.set(
      {
        [STORAGE_KEY_QUEUE]: queue,
      },
      () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          chrome.browserAction.setBadgeText({
            text: (queue || []).length.toString(),
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

export async function addAndSaveQueue(tab) {
  // get queue
  const queue = await getChromeQueue();

  // follow url redirects
  const { url, title } = await followRedirects(tab);

  // add tab to queue
  queue.push({
    id: uuid(),
    dateAdded: new Date().toISOString(),
    url,
    title,
  });

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
