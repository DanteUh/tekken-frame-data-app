import React from 'react';
import ReactTable from 'react-table';

const DataTable = (props) => {
  return (
    <div className="data-table">
      <ReactTable
        columns={[
          {
            Header: 'Command',
            accessor: 'command',
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
        data={props.characterData}
        className="-striped -highlight"
      />
    </div>
  );
};

export default DataTable;

