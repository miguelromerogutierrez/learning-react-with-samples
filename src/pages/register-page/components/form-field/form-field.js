import React from 'react';
import './form-field.scss';

export default function FormField(props) {
  return (
    <div className="form-field">
      <label
        className="form-field__label"
        htmlFor={props.id}
      >
        {props.labelText}
      </label>
      <input
        id={props.id}
        className="form-field__input"
        type="text"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
      {
        !!props.error
        ? <p className="form-field__error">{props.error}</p>
        : null
      }
    </div>
  )
}
