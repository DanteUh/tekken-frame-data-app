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
          <button className="btn-custom dropdown d-flex justify-content-between align-items-center" onClick={this.toggleClick}>
            {`${this.props.characterData[0].type}s`}
            {this.state.collapse ?
              <i className="fa fa-angle-up fa-2x" aria-hidden="true"></i> :
              <i className="fa fa-angle-down fa-2x" aria-hidden="true"></i>
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
