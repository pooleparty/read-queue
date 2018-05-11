import { v4 as uuid } from 'node-uuid';
import { showErrorNotification, showBasicNotification } from './notifications';
import followRedirects from './utils';

export const STORAGE_KEY_QUEUE = 'STORAGE_KEY_QUEUE';

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

function saveChromeQueue(queue) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(queue)) {
      reject(new Error('Queue must be an Array'));
    } else {
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
    }
  });
}

export async function clearChromeQueue() {
  try {
    await saveChromeQueue([]);
    showBasicNotification('Clear Queue', 'Queue Successfully Cleared');
  } catch (e) {
    showErrorNotification(e.message);
  }
}

export async function addAndSaveQueue(tab) {
  try {
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
  } catch (e) {
    showErrorNotification(e.message);
    return [];
  }
}

export async function removeTabAndSaveQueue(tabId) {
  try {
    // get queue
    const queue = await getChromeQueue();
    // filter tab from queue
    const newQueue = queue.filter(item => item.id !== tabId);
    // save new queue
    await saveChromeQueue(newQueue);

    // return new queue
    return newQueue;
  } catch (e) {
    showErrorNotification(e.message);
    return [];
  }
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
