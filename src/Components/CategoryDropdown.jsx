import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import DataTable from './DataTable';

export default class CategoryDropdown extends Component {
  state = {
    collapse: true,
    characterData: 'characterData',
  }

  toggleClick = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div className="category-dropdown">
        <button onClick={this.toggleClick}>
          <h2>Category Dropdown</h2>
        </button>
        <Collapse isOpen={this.state.collapse}>
          <DataTable characterData={this.state.characterData} />
        </Collapse>
      </div>
    );
  }
}
