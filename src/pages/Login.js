import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Login extends Component {
  // constructor() {
  //   super();
  // }

  render() {
    const { onInputChange, onHandleClick, username, saveButtonEnabled } = this.props;

    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="username">
            Insira seu nome
            <input
              data-testid="login-name-input"
              type="text"
              name="username"
              value={ username }
              onChange={ onInputChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ saveButtonEnabled }
            onClick={ onHandleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  username: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onHandleClick: PropTypes.func.isRequired,
  saveButtonEnabled: PropTypes.bool.isRequired,
};
