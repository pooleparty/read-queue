import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTabToQueue } from '../actions';
import { getActiveTab } from '../utils/queue';

function AddToQueueButton(props) {
  return (
    <button className="btn btn-primary btn-xs" onClick={props.onAddTabToQueue}>
      Add current tab to queue
    </button>
  );
}

AddToQueueButton.propTypes = {
  onAddTabToQueue: propTypes.func.isRequired,
};

const mapDispatchToProp = dispatch => ({
  onAddTabToQueue: async () => {
    const tab = await getActiveTab();
    dispatch(addTabToQueue(tab));
  },
});

export default connect(null, mapDispatchToProp)(AddToQueueButton);
