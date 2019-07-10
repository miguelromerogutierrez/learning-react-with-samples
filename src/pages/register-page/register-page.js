import React from 'react'

import Form from './components/form/form';
import Spinner from '../shared_component/spinner/spinner';

import './register-page.scss';

export default class RegisterPage extends React.Component {

  state = {
    loading: false,
    success: false,
  };

  handleSubmitForm = (e) => {
    this.setState({
      loading: true
    }, () => {
      setTimeout(() => {
        this.setState({ loading: false, success: true });
      }, 1500);
    })
  }

  render() {
    const { loading, success } = this.state;
    if (loading) return <Spinner />;
    if (success) return (
      <div className="register-page">
        <h1 className="success">Success! <i class="fas fa-check-circle"></i></h1>
      </div>
    )
    return <Form onSubmit={this.handleSubmitForm} />
  }
}
