import React from 'react';
import PropTypes from 'prop-types';
import { DropdownItem } from 'reactstrap';

const CharacterList = props => (
  <DropdownItem
    onClick={props.handleChange}
    value={props.selectedCharacter}
    name="selectedCharacter"
    className="menu-item d-flex align-items-center"
  >
    <img src={props.characterThumbnail} alt="" className="character-thumbnail mr-3" />
    <h4>{props.characterName}</h4>
  </DropdownItem>
);

CharacterList.propTypes = {
  characterName: PropTypes.string.isRequired,
  selectedCharacter: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  characterThumbnail: PropTypes.string.isRequired,
};

export default CharacterList;
