import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { importQueueEntries } from '../actions';
import '../styles/ImportSelection.scss';

function getHostname(url) {
  const u = new URL(url);
  return u.href;
}

class ImportSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedEntries: [] };

    this.selectImportEntry = this.toggleEntrySelected.bind(this);
    this.onImport = this.onImport.bind(this);
  }

  onImport() {
    const toImport = this.props.importQueue.filter(entry =>
      this.state.selectedEntries.includes(entry.id));
    this.props.onImport(toImport);
  }

  toggleEntrySelected(id) {
    const selectedEntries = [].concat(this.state.selectedEntries);
    const i = this.state.selectedEntries.indexOf(id);
    if (i > -1) {
      selectedEntries.splice(i, 1);
    } else {
      selectedEntries.push(id);
    }
    this.setState({ selectedEntries });
  }

  render() {
    const { importQueue } = this.props;
    const { selectedEntries } = this.state;

    if (!importQueue.length) {
      return null;
    }

    const renderEntries = importQueue.map(entry => (
      <div key={entry.id} className="import-entry">
        <div className="import-entry__input">
          <input
            type="checkbox"
            value={entry.id}
            checked={selectedEntries.includes(entry.id)}
            onChange={() => {
              this.toggleEntrySelected(entry.id);
            }}
          />
        </div>
        <div className="import-entry__label">
          <div>{entry.title}</div>
          <small className="label__details">{getHostname(entry.url)}</small>
          {entry.isDuplicate && (
            <div className="import-entry__duplicate">Possible Duplicate Entry</div>
          )}
        </div>
      </div>
    ));

    return (
      <div>
        <h2>Select entries to import</h2>
        <div className="import-list">{renderEntries}</div>
        <button onClick={this.onImport} disabled={!selectedEntries.length}>
          Import
        </button>
      </div>
    );
  }
}

ImportSelection.propTypes = {
  importQueue: propTypes.arrayOf(propTypes.shape({
    id: propTypes.string,
    url: propTypes.string,
    isDuplicate: propTypes.bool,
  })),
  onImport: propTypes.func.isRequired,
};

ImportSelection.defaultProps = {
  importQueue: [],
};

const mapStateToProps = state => ({ importQueue: state.importQueue });

const mapDispatchToProps = dispatch => ({
  onImport: (entries) => {
    dispatch(importQueueEntries(entries));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportSelection);
