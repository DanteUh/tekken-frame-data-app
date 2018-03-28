import React, { Component } from 'react';

// Components
import CategoryDropdown from './Components/CategoryDropdown';
import CharacterMenu from './Components/CharacterMenu';

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
      characterData.character.launchers,
      characterData.character.throws,
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
        <div className="app-container p-4">
          <div className="character-header mb-2">
            <h1 className="character-heading ml-1">
              { displayName }
            </h1>
            <div className="character-nav mt-2">
              <CharacterMenu
                handleChange={this.handleChange}
                selectedCharacter={this.state.selectedCharacter}
                stringToUppercaseWithSpace={this.stringToUppercaseWithSpace}
                selectedDisplayName={displayName}
              />
            </div>
          </div>
          <div className="horizontal-line" />
          <div className="data-container text-white mt-3 mb-3">
            {categoryDropdown}
          </div>
        </div>
      </div>
    );
  }
}
