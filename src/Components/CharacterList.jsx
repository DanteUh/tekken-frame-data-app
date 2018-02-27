import React from 'react';
import { ListGroupItem } from 'reactstrap';

const CharacterList = (props) => {
  return (
    <ListGroupItem style={{ padding: 2 }}>
      <button className="character-btn" name="selectedCharacter" value={props.characterName} onClick={props.handleClick}>
        {props.characterName}
      </button>
    </ListGroupItem>
  );
}

export default CharacterList;
