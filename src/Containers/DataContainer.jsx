import React, { Component } from 'react';
import CategoryDropdown from '../Components/CategoryDropdown';
import SearchBar from '../Components/SearchBar';

export default class DataContainer extends Component {
  state = {
    data: 'data',
  }

  render() {
    return (
      <div className="data-container">
        <SearchBar />
        <CategoryDropdown />
      </div>
    );
  }
}
