global.chrome = {
  runtime: { lastError: null },
  notifications: { create: jest.fn() },
  contextMenus: { create: jest.fn() },
  tabs: { query: jest.fn() },
  storage: {
    sync: {
      get: jest.fn(),
      set: jest.fn(),
    },
  },
  browserAction: {
    setBadgeText: jest.fn(),
  },
};
