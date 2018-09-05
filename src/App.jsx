import React, { Component } from 'react';

// Components
import CategoryDropdown from './Components/CategoryDropdown';
import CharacterMenu from './Components/CharacterMenu';
import DataTable from './Components/DataTable';

export default class App extends Component {
  state = {
    selectedCharacter: 'akuma',
  }

  componentDidMount() {
    this.updateSelectedData();
  }

  fetchCharacterData = () => {
    const characterData = require(`./Server/CharacterData/${this.state.selectedCharacter}`);
    return [
      characterData.character.filteredMoves,
    ];
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateSelectedData = () => {
    this.setSelectedCharacterDisplayName();
    this.fetchCharacterData();
  }

  stringToUppercaseWithSpace = (string) => {
    return string.replace("-", " ")
    .replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  setSelectedCharacterDisplayName = () => {
    const displayName = this.stringToUppercaseWithSpace(this.state.selectedCharacter);
    this.setState({ displayName });
  }

  render() {
    const displayName = this.stringToUppercaseWithSpace(this.state.selectedCharacter);
    const characterData = this.fetchCharacterData();

    const categoryDropdown = characterData.map((data, i) => {
      return (
        <CategoryDropdown
          key={i}
          characterData={data}
          selectedCharacter={this.state.selectedCharacter}/>
      );
    });
    return (
      <div className="app-body">
        <div className="app-container pr-4 pl-4 pt-2 pb-2">
          {/* .fixed-top-bar */}
          <div className="navbar">
          {/* character-header-fixed */}
            <div className="character-header mb-1">
              <h1 className="character-heading">
                { displayName }
              </h1>
              <div className="character-nav mt-1">
                <CharacterMenu
                  handleChange={this.handleChange}
                  selectedCharacter={this.state.selectedCharacter}
                  stringToUppercaseWithSpace={this.stringToUppercaseWithSpace}
                  selectedDisplayName={displayName}
                />
              </div>
            </div>
          </div>
          <div className="horizontal-line" />
          <div className="data-container text-white mt-3">
            <div class="category-container mb-1">
              <DataTable characterData={this.characterData} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
