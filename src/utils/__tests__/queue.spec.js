import { addAndSaveQueue, getChromeQueue, clearChromeQueue, removeTabAndSaveQueue } from '../queue';

jest.mock('node-uuid', () => ({
  v4: () => 1,
}));

describe('queue', () => {
  describe('getQueue', () => {
    test('should return queue', async () => {
      chrome.storage.sync.get.mockImplementation((key, callback) => {
        callback({ [key]: [] });
      });
      const queue = await getChromeQueue();
      expect(queue).toBeDefined();
      expect(queue).toHaveLength(0);
    });
  });
});
