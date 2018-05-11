import 'babel-polyfill';
import find from 'lodash/find';
import { addAndSaveQueue, addQueueChangeListener, clearChromeQueue } from './utils/queue';
import { showAddedNotification, showRemovedNotification } from './utils/notifications';

// A generic onclick callback function.
function addToQueue(info, tab) {
  let { url, title } = tab;
  if (info.linkUrl) {
    url = info.linkUrl;
    title = info.selectionText;
  }

  addAndSaveQueue({ url, title });
}

function confirmClearQueue() {
  const clear = confirm('Are you sure you want to clear your queue?');

  if (clear) {
    clearChromeQueue();
  }
}

chrome.contextMenus.removeAll(() => {
  // Create 'Add to Queue' context menu item
  const titleAddToQueue = 'Add to Queue';
  chrome.contextMenus.create({
    title: titleAddToQueue,
    contexts: ['page', 'link'],
    onclick: addToQueue,
  });

  const titleClearQueue = 'Clear Queue';
  chrome.contextMenus.create({
    title: titleClearQueue,
    contexts: ['page', 'link'],
    onclick: confirmClearQueue,
  });
});

addQueueChangeListener((oldValue, newValue) => {
  const added = [];
  newValue.forEach((item) => {
    if (!find(oldValue, { id: item.id })) {
      added.push(item);
    }
  });

  const removed = [];
  oldValue.forEach((item) => {
    if (!find(newValue, { id: item.id })) {
      removed.push(item);
    }
  });

  showAddedNotification(added);
  showRemovedNotification(removed);
});
