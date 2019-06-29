import React from 'react'
import PropTypes from 'prop-types';

import './external-source.scss';

function ExternalSource({image, title, content, link}) {
  return (
    <div className="external-source--card">
      <div className="external-source--image">
        <img src={image} alt="some ramdom pic" />
      </div>
      <div className="external-source--content">
        <div className="content__title">{title}</div>
        <div className="content__description">{content}</div>
        <div className="content__footer">{link}</div>
      </div>
    </div>
  )
}

ExternalSource.propTypes = {

}

export default ExternalSource

