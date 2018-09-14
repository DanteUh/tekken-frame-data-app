import React, { Component } from 'react';

// Components
import CharacterMenu from './CharacterMenu';
import DataTable from './DataTable';

export default class Main extends Component {
  state = {
    characterData: [],
    selectedCharacterData: [],
    selectedCharacter: 'akuma',
    displayName: 'Akuma',
  };

  async componentDidMount() {
    this.getCharacters();
  };

  getCharacters = () => {
    fetch('http://localhost:8080/characters')
    .then(res => {
      return res.json();
    })
    .then(data => {
      this.setState({ characterData: data });
      this.filterCharacterData(data);
    })
    .catch(err => {
      console.log('Error', err);
    });
  };

  filterCharacterData = (dataArray) => {
    const filteredData = dataArray.map(characterObj => {
      return characterObj;
    }).filter(character => {
      return character.name === this.state.selectedCharacter;
    }).map(data => {
      return data.moves;
    });
    filteredData.forEach(element => {
      this.setState({ selectedCharacterData: element });
    });
  };

  handleChange = async (e) => {
    await this.setState({ [e.target.name]: e.target.value });
    this.setSelectedCharacterDisplayName();
    this.filterCharacterData(this.state.characterData);
  };

  stringToUppercaseWithSpace = (string) => {
    return string.replace("-", " ")
    .replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  setSelectedCharacterDisplayName = () => {
    const displayName = this.stringToUppercaseWithSpace(this.state.selectedCharacter);
    this.setState({ displayName });
  };

  render() {
    return (
      <div className="main-body d-flex flex-column justify-content-center align-items-center">
        <div className="main-container p-2">
          <div className="character-header d-flex flex-row justify-content-between align-items-end mb-1 mt-2 pb-1">
            <h1 className="character-heading">
              { this.state.displayName }
            </h1>
            <div className="character-nav mt-1">
              <CharacterMenu
                handleChange={this.handleChange}
                selectedCharacter={this.state.selectedCharacter}
                stringToUppercaseWithSpace={this.stringToUppercaseWithSpace}
                selectedDisplayName={this.state.displayName}
              />
            </div>
          </div>
          <div className="horizontal-line mb-2"></div>
          <p>You can search, filter and sort in the data table. The columns are also resizable</p>
          <div className="data-container text-white mt-1">
            <DataTable selectedCharacterData={this.state.selectedCharacterData} />
          </div>
        </div>
      </div>
    );
  };
};
