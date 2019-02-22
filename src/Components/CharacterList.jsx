import React from 'react';
import PropTypes from 'prop-types';
import { DropdownItem } from 'reactstrap';

const CharacterList = props => (
  <DropdownItem
    onChange={props.handleChange}
    value={props.characterNameValue}
    name="selectedCharacter"
    className="menu-item d-flex align-items-center"
  >
    <picture>
      <source
        srcSet={props.characterThumbnailWebp}
        type="image/webp"
        className="character-thumbnail"
      />
      <img
        src={props.characterThumbnailPng}
        className="character-thumbnail mr-3"
        alt=""
      />
    </picture>
    {props.characterName}
  </DropdownItem>
);

CharacterList.propTypes = {
  characterName: PropTypes.string.isRequired,
  characterNameValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  characterThumbnailWebp: PropTypes.any.isRequired,
  characterThumbnailPng: PropTypes.any.isRequired,
};

export default CharacterList;
