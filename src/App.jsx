import React, { Component } from 'react';
import { ListGroup, Container, Row, Col } from 'reactstrap';
import './App.css';
import characters from './Server/characterNames';
import DataContainer from './Containers/DataContainer';
import CharacterList from './Components/CharacterList';

class App extends Component {
  state = {
    characterList: characters.characterNames,
    selectedCharacter: '',
  }

  handleClick = (e) => {this.setState({ [e.target.name]: e.target.value })};

  render() {

    const characterNavigation = this.state.characterList.map((char, i) => {
      return (
        <CharacterList
          key={i}
          handleClick={this.handleClick}
          characterName={char} />
      );
    });
    console.log(this.state.selectedCharacter);
    return (
      <div className="App">
        <Container style={{ maxWidth: "100%" }}>
          <Row>
            <Col xs="2" style={{ padding: 0 }}>
              <div className="character-nav">
                <ListGroup>
                  {characterNavigation}
                </ListGroup>
              </div>
            </Col>
            <Col style={{ padding: 0 }}>
              <DataContainer
                selectedCharacter={this.state.selectedCharacter} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
