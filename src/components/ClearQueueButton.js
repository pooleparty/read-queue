import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearQueue } from '../actions';

function ClearQueueButton(props) {
  if (!props.queue.length) {
    return null;
  }

  return (
    <button className="btn btn-default btn-xs" onClick={props.onClearQueue}>
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
};

ClearQueueButton.defaultProps = {
  queue: [],
};

const mapStateToProps = queue => ({ queue });

const mapDispatchToProp = dispatch => ({
  onClearQueue: () => {
    dispatch(clearQueue());
  },
});

export default connect(mapStateToProps, mapDispatchToProp)(ClearQueueButton);
