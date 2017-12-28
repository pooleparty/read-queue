import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import OptionsApp from './components/OptionsApp';
import store from './store';
import { getQueue } from './actions';

store.dispatch(getQueue());

render(
  <Provider store={store}>
    <OptionsApp />
  </Provider>,
  document.getElementById('react-root'),
);
