import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import ArtistCard from './ArtistCard';
import Loading from './Loading';

export default class SearchComp extends Component {
  constructor() {
    super();

    this.state = {
      artistSearch: '',
      artist: '',
      validateSearch: true,
      loadingArtist: false,
      albumsList: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.validateCharacters = this.validateCharacters.bind(this);
    this.validateSize = this.validateSize.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
      artist: value,
    }, this.validateCharacters);
  }

  validateSize() {
    const { albumsList, artist } = this.state;
    if (albumsList.length === 0) return <p>Nenhum álbum foi encontrado</p>;
    if (albumsList.length > 0) return <p>{`Resultado de álbuns de: ${artist}`}</p>;
  }

  // Requisito 6
  async searchClick() {
    const {
      artistSearch,
    } = this.state;

    this.setState({
      loadingArtist: true,
    });

    const albums = await searchAlbumsAPI(artistSearch);

    this.setState({
      loadingArtist: false,
      albumsList: albums,
      artistSearch: '',
    });
  }

  validateCharacters() {
    const minChar = 2;

    const {
      artistSearch,
    } = this.state;

    if (artistSearch.length >= minChar) {
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
    const {
      validateSearch,
      artistSearch,
      albumsList,
      loadingArtist,
    } = this.state;
    return (
      loadingArtist ? <Loading /> : (
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

          {this.validateSize()}
          {albumsList.map((album) => (
            <ArtistCard
              key={ album.collectionId }
              artistName={ album.artistName }
              collectionName={ album.collectionName }
              collectionId={ album.collectionId }
              artworkUrl100={ album.artworkUrl100 }
            />
          ))}
        </div>
      ));
  }
}
