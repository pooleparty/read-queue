import React from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ExportQueue from './ExportQueue';
import ImportQueue from './ImportQueue';
import '../styles/OptionsApp.scss';

import Queue from './Queue';
import ImportSelection from './ImportSelection';

function ImportView() {
  return (
    <div>
      <ImportQueue />
      <ImportSelection />
    </div>
  );
}

function QueueView() {
  return <Queue showClearQueue />;
}

export default function OptionsApp() {
  return (
    <Router>
      <div className="app-container app-container--options">
        <div className="header">
          <div className="header__text">Read Queue</div>
          <div>
            <Link className="header--link" to="/">
              View Queue
            </Link>
            <Link className="header--link" to="/import">
              Import
            </Link>
            <Link className="header--link" to="/export">
              Export
            </Link>
          </div>
        </div>
        <Switch>
          <Route path="/import" component={ImportView} />
          <Route path="/export" component={ExportQueue} />
          <Route component={QueueView} />
        </Switch>
      </div>
    </Router>
  );
}
