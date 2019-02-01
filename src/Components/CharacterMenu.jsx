import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import CharacterList from './CharacterList';

export default class CharacterMenu extends Component {
  state = {
    characterNames: [],
    displayNames: [],
    dropdownOpen: false,
    characterThumbnails: [],
    isLoading: false,
  };

  componentDidMount() {
    this.getCharacterNames();
  };

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

      this.importCharacterThumbnails();
      this.characterNamesToDisplayName();

    }).catch(err => console.log('Error', err));
  };

  importCharacterThumbnails = () => {
    const images = this.state.characterNames.map(name => {
      return require(`../images/character-thumbnails/${name}.png`);
    });
    this.setState({ characterThumbnails: images });
  };

  characterNamesToDisplayName = () => {    
    const displayNames = this.state.characterNames.map(name => {
      return this.props.stringToUppercaseWithSpace(name);
    });
    this.setState({ displayNames });
  };

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  };

  render() {
    const selectedThumbnail = require(`../images/character-thumbnails/${this.props.selectedCharacter}.png`);
    
    const characterList = this.state.displayNames.map((character, i) => {
      return (
        <CharacterList
          key={i}
          characterName={character}
          handleChange={this.props.handleChange}
          characterThumbnail={this.state.characterThumbnails[i]}
          characterNameValue={this.state.characterNames[i]}
        />
      );
    });

    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        onClick={this.props.handleChange}
        onChange={this.props.handleChange}
        value={this.props.selectedCharacter}
      >
      <DropdownToggle className="character-menu btn-custom dropdown-custom d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between align-items-center">
          <img src={selectedThumbnail} alt="character-thumbnail" className="character-thumbnail mr-3"/>
          <h3>{this.props.selectedDisplayName}</h3>
        </div>
          {this.state.dropdownOpen ?
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
