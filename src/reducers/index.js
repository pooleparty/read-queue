import {
  ADD_TAB_TO_QUEUE_FULFILLED,
  GET_QUEUE_FULFILLED,
  CLEAR_QUEUE_FULFILLED,
  REMOVE_TAB_FROM_QUEUE_FULFILLED,
} from '../actions';

export default function queueReducer(state = [], action) {
  switch (action.type) {
    case GET_QUEUE_FULFILLED:
    case CLEAR_QUEUE_FULFILLED:
    case ADD_TAB_TO_QUEUE_FULFILLED:
    case REMOVE_TAB_FROM_QUEUE_FULFILLED:
      return action.payload;
    default:
      break;
  }
  return state;
}
