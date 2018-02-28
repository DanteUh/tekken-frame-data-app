import React, { Component } from 'react';
import CategoryDropdown from '../Components/CategoryDropdown';
// import characterData from '../Server/CharacterData/lars.json';

export default class DataContainer extends Component {
  state = {
    characterData: [],
  }

  render() {
    return (
      <div className="data-container bg-dark text-white">
        <CategoryDropdown characterData={this.props.characterData}/>
      </div>
    );
  }
}
