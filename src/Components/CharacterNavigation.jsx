import React from 'react';
import PropTypes from 'prop-types';

const CharacterNavigation = props => (
  <option>
    {props.characterName}
  </option>
);

CharacterNavigation.propTypes = {
  characterName: PropTypes.string.isRequired,
};

export default CharacterNavigation;
