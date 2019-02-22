import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import CharacterList from './CharacterList';

export default class CharacterMenu extends Component {
  state = {
    characterNames: [],
    displayNames: [],
    dropdownOpen: false,
    isLoading: false,
  };

  componentDidMount() {
    this.getCharacterNames();
  };

  componentDidUpdate(props) {
    if (this.props !== props) {
      
    }
  }

  getCharacterNames = () => {
    this.setState({ isLoading: true });

    fetch('http://localhost:8080/characters/name')
    .then(res => {
      if (res.status >= 200 && res.status <= 300) {
        return res.json();

      } else {
        this.setState({ isLoading: false });

        return res.json().then(Promise.reject.bind(Promise));
      }
    }).then(data => {
      const characterNames = data.map(character => {
        return character.name
      }).sort()
      
      this.setState({
        characterNames,
        isLoading: false
      });

      this.characterNamesToDisplayName(characterNames);

    }).catch(err => console.log('Error', err));
  };

  characterNamesToDisplayName = (arr) => {    
    const displayNames = arr.map(name => {      
      return this.props.stringToUppercaseWithSpace(name);
    });

    this.setState({ displayNames });
  };

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  };

  render() {
    const { displayNames, characterNames, dropdownOpen } = this.state
    const { handleChange, selectedCharacter, selectedDisplayName } = this.props    

    const characterList = characterNames.map((character, i) => {        
      if (displayNames[i] !== undefined) {
        return (
          <CharacterList
            key={i}
            characterName={displayNames[i]}
            handleChange={handleChange}
            characterThumbnailWebp={require(`../images/character-thumbnails/${character}.webp`)}
            characterThumbnailPng={require(`../images/character-thumbnails/${character}.png`)}
            characterNameValue={character}
          />
        );
      }
    });

    return (
      <Dropdown
        isOpen={dropdownOpen}
        toggle={this.toggle}
        onClick={handleChange}
        onChange={handleChange}
        value={selectedCharacter}
      >
      <DropdownToggle className="character-menu btn-custom dropdown-custom d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between align-items-center">
        <picture>
          <source
            srcSet={require(`../images/character-thumbnails/${selectedCharacter}.webp`)}
            type="image/webp"
            className="character-thumbnail"
          />
          <img
            src={require(`../images/character-thumbnails/${selectedCharacter}.png`)}
            className="character-thumbnail mr-3"
            alt=""
          />
        </picture>
          <h3>{selectedDisplayName}</h3>
        </div>
          {dropdownOpen ?
            <i className="fa fa-angle-up" aria-hidden="true"></i> :
            <i className="fa fa-angle-down" aria-hidden="true"></i>
          }
        </DropdownToggle>
        <DropdownMenu>
          {characterList}
        </DropdownMenu>
      </Dropdown>
    );
  };
};
