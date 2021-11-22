import React, { Component } from 'react';
import Header from '../Components/Header';

export default class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <h1>Profile</h1>
        <Header />
      </div>
    );
  }
}
