import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import PropTypes from 'prop-types';
import DataTable from './DataTable';

export default class CategoryDropdown extends Component {
  state = {
    collapse: true,
  }

  toggleClick = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div className="category-dropdown pt-5 pb-3">
        <button className="dropdown-btn" onClick={this.toggleClick}>
          <h2>Category Dropdown</h2>
        </button>
        <Collapse isOpen={this.state.collapse}>
          <DataTable characterData={this.props.characterData} />
        </Collapse>
      </div>
    );
  }
}

CategoryDropdown.propTypes = {
  characterData: PropTypes.array.isRequired,
}
