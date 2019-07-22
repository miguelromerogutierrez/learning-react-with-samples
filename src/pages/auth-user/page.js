import React, { Component } from 'react'
import FormField from '../register-page/components/form-field/form-field'
import Spinner from '../shared_component/spinner/spinner';

import withAuthProvider from './auth-hoc';

import './styles.scss';

class AuthUserPage extends Component {

  state = {
    username: '',
    password: ''
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.login();
  }

  handleChangeFormField = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    if (this.props.pending) return <Spinner />;
    if (this.props.user !== null) return (
      <pre>{JSON.stringify(this.props.user)}</pre>
    );
    return (
      <div className="auth-page">
        <form onSubmit={this.handleSubmitForm}>
          <FormField
            labelText="Username"
            placeholder="Username"
            id="username"
            name="username"
            type="text"
            onChange={this.handleChangeFormField}
          />

          <FormField
            labelText="Password"
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            onChange={this.handleChangeFormField}
          />

          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
}

export default withAuthProvider(AuthUserPage);
