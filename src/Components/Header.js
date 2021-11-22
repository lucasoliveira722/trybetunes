import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">Buscar</Link>
        <Link to="/album/:id">Álbum</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile/edit">Editar Perfil</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>

      </header>
    );
  }
}
