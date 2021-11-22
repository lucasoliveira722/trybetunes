import React, { Component } from 'react';
import Header from '../Components/Header';

export default class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <h1>Search Field</h1>
        <Header />
      </div>
    );
  }
}
