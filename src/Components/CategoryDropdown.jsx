import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import DataTable from './DataTable';

export default class CategoryDropdown extends Component {
  componentDidMount() {
    this.getCharacterData();

  };
  
  state = {
    collapse: true,
    characterData: [],
  }

  getCharacterData = () => {
    fetch('http://localhost:3000/Server/CharacterData/lars.json')
      .then(res => res.json())
      .then(response =>
        this.setState({ characterData: response })
      )
      .catch(error => console.log(error));
  }

  toggleClick = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    console.log(this.state.characterData);
    return (
      <div className="category-dropdown pt-5 pb-3">
        <button className="dropdown-btn" onClick={this.toggleClick}>
          <h2>Category Dropdown</h2>
        </button>
        <Collapse isOpen={this.state.collapse}>
          <DataTable characterData={this.state.characterData} />
        </Collapse>
      </div>
    );
  }
}
