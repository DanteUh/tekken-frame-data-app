import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import characters from '../Server/characterNames';
import CharacterList from './CharacterList';
import paul from '../images/character-thumbnails/paul.png';

export default class CharacterMenu extends Component {
  state = {
    dropdownOpen: false,
  }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  render() {
    const characterList = characters.characterNames.map((char, i) => {
      return (
        <CharacterList
          key={i}
          characterName={char}
          handleChange={this.props.handleChange}
          selectedCharacter={this.props.selectedCharacter} />
      );
    });
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        onClick={this.props.handleChange}
        name="selectedCharacter"
      >
      <DropdownToggle className="character-menu btn-custom dropdown-custom d-flex justify-content-between align-items-center">
        <div>
          <img src={paul} alt=""/>
          {this.props.selectedCharacter}
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
  }
}