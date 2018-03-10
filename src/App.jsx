import React, { Component } from 'react';
import { ListGroup, Container, Row, Col } from 'reactstrap';
import './App.css';
import characters from './Server/characterNames';

// Components
import DataContainer from './Containers/DataContainer';
import CharacterList from './Components/CharacterList';

class App extends Component {
  state = {
    characterList: characters.characterNames,
    selectedCharacter: 'akuma',
    characterData: [],
  }

  componentDidMount() {
    this.fetchCharacterData();
  }

  handleClick = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.fetchCharacterData();
  };

  fetchCharacterData = () => {
    const characterData = require(`./Server/CharacterData/${this.state.selectedCharacter}`);
    const characterDataArray = [
      characterData.character.moves,
      characterData.character.launchers,
      characterData.character.throws,
    ];
    this.setState({ characterData: characterDataArray });
  };

  render() {
    console.log(this.state.selectedCharacter);
    const characterNavigation = this.state.characterList.map((char, i) => {
      return (
        <CharacterList
          key={i}
          handleClick={this.handleClick}
          characterName={char}
        />
      );
    });
    return (
      <div className="App">
        <Container style={{ maxWidth: "100%" }}>
          <Row>
            <Col xs="1" style={{ padding: 0 }}>
              <div className="character-nav">
                <ListGroup>
                  {characterNavigation}
                </ListGroup>
              </div>
            </Col>
            <Col style={{ padding: 0 }}>
              <DataContainer
                selectedCharacter={this.state.selectedCharacter}
                characterData={this.state.characterData} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
