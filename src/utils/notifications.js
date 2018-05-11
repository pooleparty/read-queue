import { v4 as uuid } from 'node-uuid';

function showNotification(options) {
  chrome.notifications.create(uuid(), options);
}

const NOTIFICATION_ICON = 'public/icons/list-128.png';

export function showAddedNotification(added = []) {
  if (added.length) {
    const options = {
      type: 'list',
      title: 'Added to Queue',
      message: 'Added to Queue',
      iconUrl: NOTIFICATION_ICON,
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
      iconUrl: NOTIFICATION_ICON,
      items: removed.map(item => ({
        title: item.title,
        message: item.url,
      })),
    };

    showNotification(options);
  }
}

export function showBasicNotification(title, message) {
  const options = {
    type: 'basic',
    title,
    message,
    iconUrl: NOTIFICATION_ICON,
  };

  showNotification(options);
}

export function showErrorNotification(error) {
  if (error) {
    const options = {
      type: 'basic',
      title: 'Error',
      message: error,
      iconUrl: NOTIFICATION_ICON,
    };

    showNotification(options);
  }
}
