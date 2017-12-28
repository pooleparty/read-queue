import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

const style = {
  width: '100%',
  height: '85vh',
};
function ExportQueue({ queue }) {
  return (
    <div>
      <textarea defaultValue={JSON.stringify(queue, null, 2)} style={style} />
    </div>
  );
}

ExportQueue.propTypes = {
  queue: propTypes.arrayOf(propTypes.shape({
    id: propTypes.string,
    title: propTypes.string,
    url: propTypes.string,
  })),
};

ExportQueue.defaultProps = {
  queue: [],
};

const mapStateToProps = ({ queue }) => ({
  queue,
});

export default connect(mapStateToProps)(ExportQueue);
