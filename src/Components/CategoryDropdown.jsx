import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import PropTypes from 'prop-types';
import DataTable from './DataTable';
import characters from '../Server/characterNames';

export default class CategoryDropdown extends Component {
  state = {
    collapse: true,
  }

  toggleClick = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    return (
      <div className="category-container">
        {this.props.characterData[0] !== undefined &&
        <div className="category-dropdown mb-5">
          <button className="btn-custom dropdown" onClick={this.toggleClick}>
            {`${this.props.characterData[0].type}s`}
          </button>
          <Collapse isOpen={this.state.collapse}>
            <DataTable characterData={this.props.characterData} />
          </Collapse>
        </div>
        }
      </div>
    );
  }
}

CategoryDropdown.propTypes = {
  characterData: PropTypes.array.isRequired,
}
