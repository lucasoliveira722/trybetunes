import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();

    this.fetchResult = this.fetchResult.bind(this);

    this.state = {
      albumResult: [],
    };
  }

  componentDidMount() {
    this.fetchResult();
  }

  async fetchResult() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({
      albumResult: result,
    });
  }

  render() {
    const {
      albumResult,
    } = this.state;

    return (
      albumResult.length > 0 && (
        <div data-testid="page-album">
          <Header />
          <h1 data-testid="artist-name">{albumResult[0].artistName}</h1>
          <h2 data-testid="album-name">{albumResult[0].collectionName}</h2>
          <div>
            {albumResult.filter((albums) => (albums.trackName && albums.previewUrl))
              .map((music) => (
                <MusicCard
                  key={ music.trackId }
                  music={ music }
                />
              ))}
          </div>
        </div>
      ));
  }
}

Album.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};
