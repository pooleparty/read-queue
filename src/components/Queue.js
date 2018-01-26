import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeTabFromQueue } from '../actions';
import QueueItem from './QueueItem';
import '../styles/Queue.scss';

function Queue({ queue, onRemoveTabFromQueue }) {
  function makeQueueItem(item) {
    return <QueueItem item={item} onRemoveTabFromQueue={onRemoveTabFromQueue} />;
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
