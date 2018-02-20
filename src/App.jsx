import React, { Component } from 'react';
import './App.css';

import DataContainer from './Components/DataContainer';

class App extends Component {
  state = {
    error: false
  }

  render() {
    return (
      <div className="App">
        <DataContainer />
      </div>
    );
  }
}

export default App;
