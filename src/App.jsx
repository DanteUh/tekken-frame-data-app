import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import characters from './Server/characterNames';

// Components
import CharacterNavigation from './Components/CharacterNavigation';
import CategoryDropdown from './Components/CategoryDropdown';

class App extends Component {
  state = {
    characterList: characters.characterNames,
    selectedCharacter: 'akuma',
    characterData: [],
  }

  componentDidMount() {
    this.fetchCharacterData(this.state.selectedCharacter);
  }

  handleClick = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.fetchCharacterData(this.state.selectedCharacter);
  };

  fetchCharacterData = (character) => {
    const characterData = require(`./Server/CharacterData/${character}`);
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
        <CharacterNavigation
          key={i}
          characterName={char} />
      );
    });

    const categoryDropdown = this.state.characterData.map((data, i) => {
      return (
        <CategoryDropdown
          key={i}
          characterData={data}
          selectedCharacter={this.state.selectedCharacter}/>
      );
    });
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <div className="character-nav">
                <Input
                  type="select"
                  name="selectedCharacter"
                  className="character-select"
                  onChange={this.handleClick}
                  value={this.state.selectedCharacter}
                >
                  {characterNavigation}
                </Input>
              </div>
              <div className="data-container bg-dark text-white">
                {categoryDropdown}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
