import React from 'react';
import AddToQueueButton from './AddToQueueButton';
import Queue from './Queue';
import '../styles/PopupApp.scss';

export default function PopupApp() {
  return (
    <div className="app-container app-container--popup">
      <h1>Read Queue</h1>
      <div className="btn-container">
        <AddToQueueButton />
      </div>
      <Queue />
    </div>
  );
}
