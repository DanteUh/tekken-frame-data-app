import React, { Component } from 'react';
import { Input } from 'reactstrap';
import characters from './Server/characterNames';

// Components
import CharacterNavigation from './Components/CharacterNavigation';
import CategoryDropdown from './Components/CategoryDropdown';

export default class App extends Component {
  state = {
    selectedCharacter: 'akuma',
    displayName: 'Akuma',
    characterData: [],
  }

  componentDidMount() {
    this.fetchCharacterData(this.state.selectedCharacter);
  }

  fetchCharacterData = (character) => {
    const characterData = require(`./Server/CharacterData/${character}`);
    const characterDataArray = [
      characterData.character.moves,
      characterData.character.launchers,
      characterData.character.throws,
    ];
    this.setState({ characterData: characterDataArray });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.createDisplayName();
    this.fetchCharacterData(this.state.selectedCharacter);
  };

  createDisplayName = () => {
    const displayName = this.state.selectedCharacter.replace("-", " ")
    .replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    });
    this.setState({ displayName });
  }

  render() {
    console.log(this.state.selectedCharacter);
    console.log(this.state.displayName);
    const characterNavigation = characters.characterNames.map((char, i) => {
      return (
        <CharacterNavigation
          key={i}
          characterName={char} />
      );
    });

    const categoryDropdown = this.state.characterData.map((data, i) => {
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
          <div className="character-nav mb-5 mt-2">
            <Input
              type="select"
              name="selectedCharacter"
              className="character-select"
              onChange={this.handleChange}
              onClick={this.handleChange}
              value={this.state.selectedCharacter}
            >
              {characterNavigation}
            </Input>
          </div>
          <h1 className="character-heading ml-1">
            { this.state.displayName }
          </h1>
          <div className="horizontal-line" />
          <div className="data-container text-white mt-3 mb-3">
            {categoryDropdown}
          </div>
        </div>
      </div>
    );
  }
}
