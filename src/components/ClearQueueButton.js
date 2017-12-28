import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearQueue } from '../actions';

function ClearQueueButton(props) {
  if (!props.queue.length) {
    return null;
  }

  function onClearQueue() {
    // eslint-disable-next-line no-alert
    if (props.confirmClear && !window.confirm('Are you sure you want to clear your queue?')) {
      return;
    }
    props.onClearQueue();
  }

  return (
    <button onClick={onClearQueue}>
      Clear queue
    </button>
  );
}

ClearQueueButton.propTypes = {
  queue: propTypes.arrayOf(propTypes.shape({
    id: propTypes.string,
    title: propTypes.string,
    url: propTypes.string,
  })),
  onClearQueue: propTypes.func.isRequired,
  confirmClear: propTypes.bool,
};

ClearQueueButton.defaultProps = {
  queue: [],
  confirmClear: false,
};

const mapStateToProps = ({ queue }) => ({ queue });

const mapDispatchToProp = dispatch => ({
  onClearQueue: () => {
    dispatch(clearQueue());
  },
});

export default connect(mapStateToProps, mapDispatchToProp)(ClearQueueButton);
