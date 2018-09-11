import React from 'react';
import PropTypes from 'prop-types';
import { DropdownItem } from 'reactstrap';

const CharacterList = props => (
  <DropdownItem
    onClick={props.handleChange}
    value={props.characterNameValue}
    name="selectedCharacter"
    className="menu-item d-flex align-items-center"
  >
    <img
      src={props.characterThumbnail}
      alt="character-thumbnail"
      className="character-thumbnail mr-3"
    />
    {props.characterName}
  </DropdownItem>
);

CharacterList.propTypes = {
  characterName: PropTypes.string.isRequired,
  characterNameValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  characterThumbnail: PropTypes.string.isRequired,
};

export default CharacterList;
