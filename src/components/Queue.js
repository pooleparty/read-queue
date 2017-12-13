import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { removeTabFromQueue } from '../actions';
import '../styles/Queue.scss';

const DATE_FORMAT = 'ddd MM/DD/YY h:mm:ss a';

function Queue({ queue, onRemoveTabFromQueue }) {
  function makeQueueItem(item) {
    return (
      <div key={item.id}>
        <div className="queue-item">
          <div>
            <a href={item.url} target="_blank">
              {item.title}
            </a>
          </div>
          <div>
            <button className="btn btn-link btn-lg" onClick={() => onRemoveTabFromQueue(item.id)}>
              &times;
            </button>
          </div>
        </div>
        <small>
          <strong>Added:</strong> {moment(item.dateAdded).format(DATE_FORMAT)}
        </small>
        <hr />
      </div>
    );
  }

  const queueItems = queue
    // .sort((a, b) => new Date(b.timeAdded) - new Date(a.timeAdded))
    .map(makeQueueItem);
  return (
    <div>
      <small>{queue.length ? `${queue.length} items in queue` : 'No items in queue'}</small>
      <hr />
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
};

Queue.defaultProps = {
  queue: [],
};

const mapStateToProps = queue => ({
  queue,
});

const mapDispatchToProps = dispatch => ({
  onRemoveTabFromQueue: tabId => dispatch(removeTabFromQueue(tabId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Queue);
