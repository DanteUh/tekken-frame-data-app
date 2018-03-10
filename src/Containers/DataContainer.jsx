import React, { Component } from 'react';
import CategoryDropdown from '../Components/CategoryDropdown';

export default class DataContainer extends Component {
  state = {
    characterData: [],
  }

  render() {
    const categoryDropdown = this.props.characterData.map((data, i) => {
      return (
        <CategoryDropdown
          key={i}
          characterData={data} />
      );
    });
    return (
      <div className="data-container bg-dark text-white">
        {categoryDropdown}
      </div>
    );
  }
}
