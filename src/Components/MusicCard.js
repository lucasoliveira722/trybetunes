import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.toggleFavorite = this.toggleFavorite.bind(this);

    this.state = {
      selectedFavorite: false,
      loading: false,
    };
  }

  async toggleFavorite(music) {
    const { selectedFavorite } = this.state;
    if (!selectedFavorite) {
      this.setState({
        loading: true,
        selectedFavorite: true,
      });
    }
    await addSong(music);

    this.setState({
      loading: false,
    });
  }

  render() {
    const {
      selectedFavorite,
      loading,
    } = this.state;

    const { music } = this.props;

    const {
      music: { trackName, previewUrl, trackId },
    } = this.props;
    return (
      loading ? <Loading /> : (
        <div>
          <h1>{trackName}</h1>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorite">
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              checked={ selectedFavorite }
              id="favorite"
              onChange={ () => this.toggleFavorite(music) }
              // defaultChecked={ localStorage.favoriteSongs }
            />
          </label>
        </div>
      ));
  }
}

MusicCard.propTypes = {
  music: PropTypes.instanceOf(Object).isRequired,
};
