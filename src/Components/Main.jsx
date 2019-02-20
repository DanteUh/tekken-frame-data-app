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
    isLoading: false,
  };

  componentDidMount() {
    this.getCharacters();
  };

  getCharacters = () => {
    const url = 'http://localhost:8080/characters';
    this.setState({ isLoading: true });

    fetch(url).then(res => {
      if (res.status >= 200 && res.status <= 300) {
        return res.json();

      } else {
        this.setState({ isLoading: false })

        return res.json().then(Promise.reject.bind(Promise));
      }
    })
    .then(data => {
      this.setState({
        characterData: data,
        isLoading: false
      });

      this.filterCharacterData(data);

    }).catch(err => console.log('Error', err));
  };

  getSelectedCharacter = () => {
    const url = `http://localhost:8080/characters/${this.state.selectedCharacter}`;
    this.setState({ isLoading: true });

    fetch(url).then(res => {
      if (res.status >= 200 && res.status <= 300) {
        return res.json();
      } else {
        this.setState({
          isLoading: false
        })
        return res.json().then(Promise.reject.bind(Promise));   
      }
    })
    .then(data => {
      this.setState({
        selectedCharacterData: data.moves,
        isLoading: false
      });
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
    if (
      this.state.selectedCharacter !== e.target.value &&
      e.target.value !== undefined &&
      e.target.value !== ''
    ) {
      await this.setState({ [e.target.name]: e.target.value });
      this.setSelectedCharacterDisplayName();
      this.getSelectedCharacter();
      //this.filterCharacterData(this.state.characterData);
    }
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
    const {displayName, characterNames, selectedCharacter, selectedCharacterData, isLoading} = this.state
    const noDataMessage = `Sorry, no data for ${displayName}. Go, practice some electrics!`

    return (
      <div className="main-body d-flex flex-column justify-content-center align-items-center">
        <div className="main-container p-2">
          <div className="character-header d-flex flex-row align-items-end mb-1">
            <h1 className="character-heading">
              { displayName }
            </h1>
            <div className="character-nav mt-1">
              <CharacterMenu
                handleChange={this.handleChange}
                characterNames={characterNames}
                selectedCharacter={selectedCharacter}
                stringToUppercaseWithSpace={this.stringToUppercaseWithSpace}
                selectedDisplayName={displayName}
              />
            </div>
          </div>
          <div className="horizontal-line mb-3"></div>
          <p>You can search, filter and sort in the data table. The columns are also resizable</p>
          <div className="data-container text-white mt-3">
            <DataTable
              selectedCharacterData={selectedCharacterData}
              isLoading={isLoading}
              noDataMessage={noDataMessage}
            />
          </div>
        </div>
      </div>
    );
  };
};
