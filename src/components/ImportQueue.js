import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { processImportQueue } from '../actions';
import '../styles/ImportQueue.scss';

function ImportQueue(props) {
  let importInput;

  function onImportQueue() {
    if (!importInput.value) {
      alert('Please entry a value in the import field');
      return;
    }
    let parsedInput;
    try {
      parsedInput = JSON.parse(importInput.value);
    } catch (e) {
      alert(`There was an error parsing the input:\n\n ${e}`);
      return;
    }

    props.onImportQueue(parsedInput);
  }

  return (
    <div>
      <textarea
        className="import-queue__input"
        rows="10"
        ref={(input) => {
          importInput = input;
        }}
      />
      <button onClick={onImportQueue}>Import Queue</button>
    </div>
  );
}

ImportQueue.propTypes = {
  onImportQueue: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onImportQueue: (queue) => {
    dispatch(processImportQueue(queue));
  },
});

export default connect(undefined, mapDispatchToProps)(ImportQueue);
