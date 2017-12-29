import 'babel-polyfill';
import find from 'lodash/find';
import { addAndSaveQueue, addQueueChangeListener } from './utils/queue';
import { showAddedNotification, showRemovedNotification } from './utils/notifications';

// A generic onclick callback function.
function genericOnClick(info, tab) {
  let { url, title } = tab;
  if (info.linkUrl) {
    url = info.linkUrl;
    title = info.selectionText;
  }

  addAndSaveQueue({ url, title });
}

// Create 'Add to Queue' context menu item
const title = 'Add to Queue';
chrome.contextMenus.create({
  title,
  contexts: ['page', 'link'],
  onclick: genericOnClick,
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
