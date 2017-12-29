import { v4 as uuid } from 'node-uuid';

function showNotification(options) {
  chrome.notifications.create(uuid(), options);
}

export function showAddedNotification(added = []) {
  if (added.length) {
    const options = {
      type: 'list',
      title: 'Added to Queue',
      message: 'Added to Queue',
      iconUrl: 'public/icons/list-16.png',
      items: added.map(item => ({
        title: item.title,
        message: item.url,
      })),
    };
    showNotification(options);
  }
}

export function showRemovedNotification(removed = []) {
  if (removed.length) {
    const options = {
      type: 'list',
      title: 'Removed from Queue',
      message: 'Removed from Queue',
      iconUrl: 'public/icons/-list-16.png',
      items: removed.map(item => ({
        title: item.title,
        message: item.url,
      })),
    };

    showNotification(options);
  }
}
