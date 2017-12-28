import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import PopupApp from './components/PopupApp';
import store from './store';
import { getQueue } from './actions';

store.dispatch(getQueue());

render(
  <Provider store={store}>
    <PopupApp />
  </Provider>,
  document.getElementById('react-root'),
);
