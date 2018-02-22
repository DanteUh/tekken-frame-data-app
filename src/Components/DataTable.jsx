import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

const DataTable = props => (
  <div className="data-table">
    <ReactTable
      columns={[
        {
          Header: "Command",
        },
        {
          Header: "Hit Level",
        },
        {
          Header: "Damage",
        },
        {
          Header: "Start Up Frame",
        },
        {
          Header: "Block Frame",
        },
        {
          Header: "Hit Frame",
        },
        {
          Header: "Counter Hit Frame",
        },
        {
          Header: "Notes",
        },
      ]}
    />
    <h2>{props.characterData}</h2>
  </div>
);

DataTable.propTypes = {
  characterData: PropTypes.string.isRequired,
};

export default DataTable;
