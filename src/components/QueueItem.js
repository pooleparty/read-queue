import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

const DATE_FORMAT = 'ddd MM/DD/YY h:mm:ss a';

function getHostname(url) {
  const u = new URL(url);
  return u.hostname;
}

export default function QueueItem({ item, onRemoveTabFromQueue }) {
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
            <span aria-hidden="true">x</span>
          </button>
        </div>
      </div>
      <div className="queue-item__details">
        <small>{getHostname(item.url)}</small>
        <br />
        <small>Added - {moment(item.dateAdded).format(DATE_FORMAT)}</small>
      </div>
      <hr />
    </div>
  );
}

QueueItem.propTypes = {
  item: propTypes.shape({
    id: propTypes.string,
    title: propTypes.string,
    url: propTypes.string,
  }).isRequired,
  onRemoveTabFromQueue: propTypes.func.isRequired,
};
