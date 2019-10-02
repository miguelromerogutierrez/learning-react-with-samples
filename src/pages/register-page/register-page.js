import React from 'react'

import Form from './components/form/form';
import Spinner from '../shared_component/spinner/spinner';

import FormField from './components/form-field/form-field';
import RadiobuttonField from './components/radiobutton-field/radiobutton-field';
import Button from './components/primary-button/primary-button';

import './register-page.scss';

export default class RegisterPage extends React.Component {

  state = {
    loading: false,
    success: false,
    form: {
      name: '',
      lastName: '',
      genre: '',
    },
    formErrors: {
      name: false,
      lastName: '',
      genre: '',
    }
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { form } = this.state;
    const formErrors = {};

    if (!form.name) formErrors.name = 'Name field is required!';
    if (!form.lastName) formErrors.lastName = 'Last Name field is required!';
    if (!form.genre) formErrors.genre = 'Genre is required!';

    if (Object.keys(formErrors).length > 0) {
      this.setState({
        formErrors
      });
    } else {
      this.setState({
        loading: true
      }, () => {
        setTimeout(() => {
          this.setState({ loading: false, success: true });
        }, 1500);
      })
    }
  }

  handleChangeField = (e) => {
    const value = e.currentTarget.value;
    const key = e.currentTarget.name;
    this.setState(oldState => {
      return ({
        form: {
          ...oldState.form,
          [key]: value
        }
      })
    })
  }

  render() {
    const { loading, success, formErrors, form } = this.state;
    if (loading) return <Spinner />;
    if (success) return <SuccessPage />;
    return <Form onSubmit={this.handleSubmitForm} title="Register form">
      <FormField
        labelText="Name"
        name="name"
        id="name"
        placeholder="Name"
        value={form.name}
        onChange={this.handleChangeField}
        error={formErrors.name}
      />
      <FormField
        labelText="Last Name"
        name="lastName"
        id="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={this.handleChangeField}
        error={formErrors.lastName}
      />
      <Field label="Genre">
        <RadiobuttonField name="genre" id="genre-female" value="female" onChange={this.handleChangeField} checked={form.genre === 'female'}>
          Female
              </RadiobuttonField>
        <RadiobuttonField name="genre"
          id="genre-male" value="male" onChange={this.handleChangeField} checked={form.genre === 'male'}>
          Male
              </RadiobuttonField>
        {
          formErrors.genre
            ? <p className="field-error">{formErrors.genre}</p>
            : null
        }
      </Field>
      <div className="form-button">
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  }
}

function SuccessPage() {
  return (
    <div className="register-page">
      <h1 className="success">Success! <i class="fas fa-check-circle"></i></h1>
    </div>
  );
}

function Field(props) {
  return (
    <div className="field">
      <label className="field-label">{props.label}</label>
      {props.children}
    </div>
  );
}
