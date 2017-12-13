import React from 'react';
import AddToQueueButton from './AddToQueueButton';
import ClearQueueButton from './ClearQueueButton';
import Queue from './Queue';
import '../styles/App.scss';

export default function App() {
  return (
    <div className="app-container">
      <h1>Read Queue</h1>
      <div className="btn-container">
        <AddToQueueButton />
      </div>
      <Queue />
      <ClearQueueButton />
    </div>
  );
}
