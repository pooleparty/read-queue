import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { removeTabFromQueue } from '../actions';
import ClearQueueButton from './ClearQueueButton';
import '../styles/Queue.scss';

const DATE_FORMAT = 'ddd MM/DD/YY h:mm:ss a';

function getHostname(url) {
  const u = new URL(url);
  return u.hostname;
}

function Queue({ queue, onRemoveTabFromQueue, showClearQueue }) {
  function makeQueueItem(item) {
    return (
      <div key={item.id} className="queue-item">
        <div className="queue-item__link-container">
          <div>
            <a href={item.url} target="_blank">
              {item.title}
            </a>
          </div>
          <div>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => onRemoveTabFromQueue(item.id)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div className="queue-item__details">
          <small>{getHostname(item.url)}</small>
          <br />
          <small>Added - {format(new Date(item.dateAdded), DATE_FORMAT)}</small>
        </div>
      </div>
    );
  }

  const queueItems = queue
    // .sort((a, b) => new Date(b.timeAdded) - new Date(a.timeAdded))
    .map(makeQueueItem);
  return (
    <div>
      <div className="queue__header">
        <small>{queue.length ? `${queue.length} items in queue` : 'No items in queue'}</small>
        {showClearQueue && <ClearQueueButton confirmClear />}
      </div>
      <div className="queue-container">{queueItems}</div>
    </div>
  );
}

Queue.propTypes = {
  queue: propTypes.arrayOf(propTypes.shape({
    id: propTypes.string,
    title: propTypes.string,
    url: propTypes.string,
  })),
  onRemoveTabFromQueue: propTypes.func.isRequired,
  showClearQueue: propTypes.bool,
};

Queue.defaultProps = {
  queue: [],
  showClearQueue: false,
};

const mapStateToProps = ({ queue }) => ({
  queue,
});

const mapDispatchToProps = dispatch => ({
  onRemoveTabFromQueue: tabId => dispatch(removeTabFromQueue(tabId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Queue);
