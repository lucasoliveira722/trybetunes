import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      newLoading: false,
    };

    this.userLog = this.userLog.bind(this);
  }

  componentDidMount() {
    this.userLog();
  }

  async userLog() {
    this.setState({
      newLoading: true,
    });
    const user = await getUser();

    this.setState({
      name: user.name,
      newLoading: false,
    });
  }

  render() {
    const { name, newLoading } = this.state;
    if (newLoading) return <Loading />;
    return (
      <header data-testid="header-component">
        <h3 data-testid="header-user-name">
          { name }
        </h3>
        <nav>
          <Link to="/search" data-testid="link-to-search">Buscar</Link>
          <Link to="/album/:id">Álbum</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile/edit">Editar Perfil</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}
