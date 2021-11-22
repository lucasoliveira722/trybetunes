import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';
// import Loading from './Components/Loading';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      saveButtonEnabled: true,
      loading: false,
      redirect: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.enableSaveButton = this.enableSaveButton.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.enableSaveButton);
  }

  async onHandleClick() {
    const {
      username,
    } = this.state;

    this.setState({
      loading: true,
    });
    await createUser({ name: username });
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  enableSaveButton() {
    const minCharacters = 3;
    const {
      username,
    } = this.state;

    if (username.length >= minCharacters) {
      this.setState({
        saveButtonEnabled: false,
      });
    } else {
      this.setState({
        saveButtonEnabled: true,
      });
    }
  }

  render() {
    const {
      username,
      saveButtonEnabled,
      loading,
      redirect,
    } = this.state;

    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Login
              onInputChange={ this.onInputChange }
              username={ username }
              saveButtonEnabled={ saveButtonEnabled }
              onHandleClick={ this.onHandleClick }
              loading={ loading }
              redirect={ redirect }
            />) }
          />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
