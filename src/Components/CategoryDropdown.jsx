import React, { Component } from 'react';
import DataTable from './DataTable';

export default class CategoryDropdown extends Component {
  state = {
    characterData: 'characterData',
  }

  render() {
    return (
      <div className="category-dropdown">
        <h1>Category Dropdown</h1>
        <DataTable characterData={this.state.characterData} />
      </div>
    );
  }
}
