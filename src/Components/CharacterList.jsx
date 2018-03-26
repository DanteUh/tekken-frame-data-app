import React from 'react';
import PropTypes from 'prop-types';
import { DropdownItem } from 'reactstrap';

const CharacterList = props => (
  <DropdownItem
    onClick={props.handleChange}
    value={props.characterName}
    name="selectedCharacter"
  >
    {props.characterName}
  </DropdownItem>
);

CharacterList.propTypes = {
  characterName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CharacterList;
