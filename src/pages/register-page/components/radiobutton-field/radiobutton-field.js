import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';

import './radiobutton-field.scss';

function RadiobuttonField({className, children, ...props}) {
  const classname = classnames('radiobutton-field', { active: props.checked }, className);
  return (
    <div className={classname}>
      <input {...props} className="radiobutton-field__input" type="radio" />
      <label className="radiobutton-field__label" htmlFor={props.id}>{children}</label>
    </div>
  )
}

RadiobuttonField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
}

export default RadiobuttonField

