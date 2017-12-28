import { combineReducers } from 'redux';
import queue from './queue';
import importQueue from './importQueue';

export default combineReducers({
  queue,
  importQueue,
});
