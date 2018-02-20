import React, { Component } from 'react';
import DataTable from './DataTable';

export default class DataContainer extends Component {
  state = {
    characterData: 'characterData',
  }

  render() {
    return (
      <div className="data-container">
        <DataTable characterData={this.state.characterData} />
      </div>
    );
  }
}
