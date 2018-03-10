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
      <div className="category-dropdown p-3">
        <button className="dropdown-btn" onClick={this.toggleClick}>
          <h4>Category Dropdown</h4>
        </button>
        <Collapse isOpen={this.state.collapse}>
          <DataTable characterData={this.props.characterData} />
        </Collapse>
      </div>
    );
  }
}

/* CategoryDropdown.propTypes = {
  characterData: PropTypes.array.isRequired,
} */
