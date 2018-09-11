import React, { Component } from 'react';

// Components
import CharacterMenu from './Components/CharacterMenu';
import DataTable from './Components/DataTable';

export default class App extends Component {
  state = {
    characterData: [],
    selectedCharacterData: [],
    selectedCharacter: 'akuma',
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
      this.filterCharacterData(data);
    })
    .catch(err => {
      console.log('Error', err)
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
    this.filterCharacterData(this.state.characterData);
  };

  stringToUppercaseWithSpace = (string) => {
    return string.replace("-", " ")
    .replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  setSelectedCharacterDisplayName = () => {
    return this.stringToUppercaseWithSpace(this.state.selectedCharacter);
  }

  render() {
    const displayName = this.stringToUppercaseWithSpace(this.state.selectedCharacter);
    console.log(this.state.selectedCharacterData);
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
