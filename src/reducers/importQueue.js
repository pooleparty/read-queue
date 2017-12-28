import { PROCESS_IMPORT_QUEUE_FULFILLED } from '../actions';

export default function importQueueReducer(state = [], action) {
  switch (action.type) {
    case PROCESS_IMPORT_QUEUE_FULFILLED:
      return action.payload;

    default:
      break;
  }
  return state;
}
