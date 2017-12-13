import 'babel-polyfill';
import { addAndSaveQueue } from './utils/queue';

// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log(`item ${info.menuItemId} was clicked`);
  console.log(`info: ${JSON.stringify(info)}`);
  console.log(`tab: ${JSON.stringify(tab)}`);

  let url;
  let title;
  if (info.linkUrl) {
    url = info.linkUrl;
    title = info.selectionText;
  } else {
    url = tab.url;
    title = tab.title;
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
