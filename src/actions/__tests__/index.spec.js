import {
  ADD_TAB_TO_QUEUE,
  addTabToQueue,
  GET_QUEUE,
  getQueue,
  CLEAR_QUEUE,
  clearQueue,
  REMOVE_TAB_FROM_QUEUE,
  removeTabFromQueue,
} from '../index';
import {
  getChromeQueue,
  clearChromeQueue,
  addAndSaveQueue,
  removeTabAndSaveQueue,
} from '../../utils/queue';

jest.mock('../../utils/queue');

describe('actions', () => {
  describe('addTabToQueue', () => {
    const TEST_URL = 'www.test.url';
    const TEST_TITLE = 'test title';

    test('should return proper action type', () => {
      const tab = { url: TEST_URL, title: TEST_TITLE };
      const action = addTabToQueue(tab);
      expect(action).toBeDefined();
      expect(action.type).toEqual(ADD_TAB_TO_QUEUE);
      expect(addAndSaveQueue).toHaveBeenCalledWith(tab);
    });
  });

  describe('getQueue', () => {
    test('should return proper action type', () => {
      const action = getQueue();
      expect(action).toBeDefined();
      expect(action.type).toEqual(GET_QUEUE);
      expect(getChromeQueue).toHaveBeenCalled();
    });
  });

  describe('clearQueue', () => {
    test('should return proper action type', () => {
      const action = clearQueue();
      expect(action).toBeDefined();
      expect(action.type).toEqual(CLEAR_QUEUE);
      expect(clearChromeQueue).toHaveBeenCalled();
    });
  });

  describe('removeTabFromQueue', () => {
    test('should return proper action type', () => {
      const tabId = 1;
      const action = removeTabFromQueue(tabId);
      expect(action).toBeDefined();
      expect(action.type).toEqual(REMOVE_TAB_FROM_QUEUE);
      expect(removeTabAndSaveQueue).toHaveBeenCalledWith(tabId);
    });
  });
});
