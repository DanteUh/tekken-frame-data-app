import React, { Component } from 'react';
import CategoryDropdown from '../Components/CategoryDropdown';
import SearchBar from '../Components/SearchBar';
import characterData from '../Server/CharacterData/lars.json';

export default class DataContainer extends Component {
  state = {
    characterData: characterData.moves,
  }

  render() {
    return (
      <div className="data-container bg-dark text-white">
        <SearchBar />
        <CategoryDropdown characterData={this.state.characterData}/>
      </div>
    );
  }
}
