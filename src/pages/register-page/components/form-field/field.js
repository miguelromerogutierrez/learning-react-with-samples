import React from 'react';

export default function Field(props) {
  return (
    <div className="form-field">
      <label className="field-field-label">{props.label}</label>
      {props.children}
    </div>
  );
}
