import React from 'react';

export default function ErrorLabel(props) {
  return props.show ? (<p className="form-field__error">{props.error}</p>) : null;
}
