import React, { Component } from 'react';
import Header from '../Components/Header';
import SearchComp from '../Components/SearchComp';

export default class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <SearchComp />
      </div>
    );
  }
}
