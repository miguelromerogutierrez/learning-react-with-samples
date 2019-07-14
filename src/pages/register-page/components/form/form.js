import React from 'react'

import FormField from '../form-field/form-field';
import RadiobuttonField from '../radiobutton-field/radiobutton-field';
import Button from '../primary-button/primary-button';

export default class Form extends React.Component {
  
  state = {
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
      this.props.onSubmit();
    }
  }

  render() {
    const { form, formErrors } = this.state;
    return (
      <div className="register-page">
          <h1>Register form</h1>
          <form onSubmit={this.handleSubmitForm}>
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
            <div className="field">
              <label className="field-label">Genre</label>
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
            </div>
            <div className="form-button">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
    )
  }
}
