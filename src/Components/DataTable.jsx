import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

const DataTable = props => (
  <div className="data-table p-2">
    <ReactTable
      filterable
      defaultFilterMethod={(filter, row) =>
        (row[filter.id]).includes(filter.value)}
      columns={[
        {
          Header: 'Command',
          accessor: 'command',
          minWidth: 200,
        },
        {
          Header: 'Hit Level',
          accessor: 'hitLevel',
        },
        {
          Header: 'Damage',
          accessor: 'damage',
        },
        {
          Header: 'Start Up Frame',
          accessor: 'startUpFrame',
        },
        {
          Header: 'Block Frame',
          accessor: 'blockFrame',
        },
        {
          Header: 'Hit Frame',
          accessor: 'hitFrame',
        },
        {
          Header: 'Counter Hit Frame',
          accessor: 'counterHitFrame',
        },
        {
          Header: 'Notes',
          accessor: 'notes',
        },
      ]}
      data={props.selectedCharacterData}
      defaultPageSize={50}
      style={{
        height: '80vh',
      }}
      className="-striped -highlight"
    />
  </div>
);

DataTable.propTypes = {
  selectedCharacterData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTable;

