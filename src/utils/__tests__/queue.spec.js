import {
  addAndSaveQueue,
  getChromeQueue,
  clearChromeQueue,
  removeTabAndSaveQueue,
  addQueueChangeListener,
  getActiveTab,
  STORAGE_KEY_QUEUE,
} from '../queue';
import { showErrorNotification, showBasicNotification } from '../notifications';
import followRedirects from '../utils';

jest.mock('node-uuid', () => ({
  v4: () => 1,
}));
jest.mock('../notifications');
jest.mock('../utils');

function mockGetChromeQueue(queue) {
  if (typeof queue === 'function') {
    chrome.storage.sync.get.mockImplementation(queue);
  } else {
    chrome.storage.sync.get.mockImplementation((key, callback) => {
      callback({ [key]: queue });
    });
  }
}

function mockGetChromeQueueError(error = new Error()) {
  chrome.storage.sync.get.mockImplementation((_, cb) => {
    chrome.runtime.lastError = error;
    cb();
  });
}

function mockSetChromeQueue() {
  chrome.storage.sync.set.mockImplementation((o, callback) => {
    callback();
  });
}

function mockSetChromeQueueError(error = new Error()) {
  chrome.storage.sync.set.mockImplementation((_, cb) => {
    chrome.runtime.lastError = error;
    cb();
  });
}

describe('queue', () => {
  beforeEach(() => {
    chrome.runtime.lastError = null;
    chrome.storage.sync.get.mockReset();
    chrome.storage.sync.set.mockReset();
  });

  describe('getChromeQueue', () => {
    test('should return queue', async () => {
      mockGetChromeQueue([1, 2, 3]);
      const queue = await getChromeQueue();
      expect(queue).toBeDefined();
      expect(queue).toHaveLength(3);
    });

    test('should return empty array when no queue exists', async () => {
      mockGetChromeQueue((key, cb) => {
        cb({});
      });
      const queue = await getChromeQueue();
      expect(queue).toBeDefined();
      expect(queue).toHaveLength(0);
    });
  });

  describe('getActiveTab', () => {
    test('should return active tab', async () => {
      const activeTab = 'activeTab';
      chrome.tabs.query.mockImplementation((q, cb) => {
        cb([activeTab]);
      });
      const tab = await getActiveTab();
      expect(tab).toEqual(activeTab);
    });

    test('should throw on error', async () => {
      chrome.tabs.query.mockImplementation((q, cb) => {
        chrome.runtime.lastError = new Error();
        cb([]);
      });
      try {
        await getActiveTab();
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
      expect.assertions(1);
    });
  });

  describe('addAndSaveQueue', () => {
    test('should show error notification and return empty array on getChromeQueue error', async () => {
      mockGetChromeQueueError();
      const queue = await addAndSaveQueue();
      expect(showErrorNotification).toHaveBeenCalled();
      expect(queue.length).toEqual(0);
    });

    test('should show error notification and return empty array on saveChromeQueue error', async () => {
      mockGetChromeQueue([1, 2, 3]);
      followRedirects.mockReturnValue(Promise.resolve({}));
      mockSetChromeQueueError();
      const queue = await addAndSaveQueue();
      expect(showErrorNotification).toHaveBeenCalled();
      expect(queue.length).toEqual(0);
    });

    test('should return new queue', async () => {
      mockGetChromeQueue([]);
      followRedirects.mockReturnValue(Promise.resolve({}));
      mockSetChromeQueue();
      const queue = await addAndSaveQueue();
      expect(queue.length).toEqual(1);
    });
  });

  describe('removeTabAndSaveQueue', () => {
    test('should show error notification and return empty array on getChromeQueue error', async () => {
      mockGetChromeQueueError();
      const queue = await removeTabAndSaveQueue();
      expect(showErrorNotification).toHaveBeenCalled();
      expect(queue.length).toEqual(0);
    });

    test('should show error notification and return empty array on saveChromeQueue error', async () => {
      mockGetChromeQueue([1, 2, 3]);
      mockSetChromeQueueError();
      const queue = await removeTabAndSaveQueue();
      expect(showErrorNotification).toHaveBeenCalled();
      expect(queue.length).toEqual(0);
    });

    test('should return new queue', async () => {
      const tabIdToRemove = 123;
      const tabToRemove = {
        id: tabIdToRemove,
      };
      mockGetChromeQueue([tabToRemove, {}]);
      mockSetChromeQueue();
      const queue = await removeTabAndSaveQueue(tabIdToRemove);
      expect(queue.length).toEqual(1);
    });
  });

  describe('addQueueChangeListener', () => {
    test('should add listener to chrome storage', async () => {
      const oldValue = 'oldValue';
      const newValue = 'newValue';
      const callback = jest.fn();
      let listener;
      chrome.storage.onChanged.addListener.mockImplementation((l) => {
        listener = l;
      });

      addQueueChangeListener(callback);
      expect(chrome.storage.onChanged.addListener).toHaveBeenCalled();
      listener({
        [STORAGE_KEY_QUEUE]: {
          oldValue,
          newValue,
        },
      });
      expect(callback).toHaveBeenCalledWith(oldValue, newValue);
    });
  });

  describe('clearChromeQueue', () => {
    test('should show notification on success', async () => {
      mockSetChromeQueue();
      await clearChromeQueue();
      expect(showBasicNotification).toHaveBeenCalled();
    });

    test('should show error notification on error', async () => {
      mockSetChromeQueueError();
      await clearChromeQueue();
      expect(showErrorNotification).toHaveBeenCalled();
    });
  });
});
