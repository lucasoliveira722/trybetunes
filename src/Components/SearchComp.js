import React, { Component } from 'react';

export default class SearchComp extends Component {
  constructor() {
    super();

    this.state = {
      artistSearch: '',
      validateSearch: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.validateCharacters = this.validateCharacters.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.validateCharacters);
  }

  searchClick() {
    console.log('OK');
  }

  validateCharacters() {
    const minChar = 2;

    const {
      artistSearch,
    } = this.state;

    if (artistSearch.length >= minChar) {
      console.log('UEPA');
      this.setState({
        validateSearch: false,
      });
    } else {
      this.setState({
        validateSearch: true,
      });
    }
  }

  render() {
    const { validateSearch, artistSearch } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="artistSearch">
            Digite a banda ou artista a ser pesquisada:
            <input
              data-testid="search-artist-input"
              type="text"
              name="artistSearch"
              value={ artistSearch }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ validateSearch }
            onClick={ this.searchClick }
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}
