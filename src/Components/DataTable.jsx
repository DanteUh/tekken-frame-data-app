import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import LarsData from '../Server/CharacterData/lars.json';

export default class DataTable extends Component {
  state = {
    frameData: LarsData.moves,
  }
  
  render() {
    console.log(this.state.frameData);
    return(
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
          data={this.state.frameData}
          className="-striped -highlight"
        />
      </div>
    );  
  }
};

