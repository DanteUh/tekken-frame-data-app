import React from 'react';
import PropTypes from 'prop-types';

const DataTable = props => (
  <div className="data-table">
    <h2>{props.characterData}</h2>
  </div>
);

DataTable.propTypes = {
  characterData: PropTypes.string.isRequired,
};

export default DataTable;
