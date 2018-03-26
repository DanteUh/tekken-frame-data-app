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
      <div className="category-container mb-5">
        {this.props.characterData[0] !== undefined &&
        <div>
          <button className="category-dropdown btn-custom dropdown-custom d-flex justify-content-between align-items-center" onClick={this.toggleClick}>
            {`${this.props.characterData[0].type}s`}
            {this.state.collapse ?
              <i className="fa fa-angle-up" aria-hidden="true"></i> :
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            }
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
