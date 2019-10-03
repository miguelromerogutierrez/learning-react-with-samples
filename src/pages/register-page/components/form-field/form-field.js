import React from 'react';
import Field from './field';
import ErrorLabel from './error-label';
import './form-field.scss';

export default function FormField(props) {
  return (
    <Field label={props.labelText}>
      <input
        id={props.id}
        className="form-field__input"
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
      <ErrorLabel error={props.error} show={!!props.error} />
    </Field>
  )
}
