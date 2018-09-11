import React, { Component } from 'react';

// Components
import CharacterMenu from './Components/CharacterMenu';
import DataTable from './Components/DataTable';

export default class App extends Component {
  state = {
    characterData: [],
    selectedCharacter: 'akuma',
    selectedCharacterData: [],
  }

  componentDidMount() {
    this.getCharacters();
  }

  getCharacters = () => {
    fetch('http://localhost:8080/characters')
    .then(res => {
      return res.json();
    })
    .then(data => {
      this.setState({ characterData: data });
      this.filterCharacterData();
    })
    .catch(err => {
      console.log('Error', err)
    });
  };

  filterCharacterData = () => {
    const filteredData = this.state.characterData.map(characterObj => {
      return characterObj;
    }).filter(character => {
      return character.name === this.state.selectedCharacter;
    }).map(data => {
      return data.moves;
    });
    filteredData.forEach(element => {
      this.setState({ selectedCharacterData: element });
    })
  }

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
            <div className="category-container mb-1">
              <DataTable selectedCharacterData={this.state.selectedCharacterData} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
