import React from 'react'
import PropTypes from 'prop-types'
import './frame.scss';

export default function RightFrame(props) {
  if (!props.show) return null;
  return (
    <div className="frame">
      <div className="overlay" />
      <div className="frame-container">
        {props.children}
      </div>
    </div>
  )
}

function FrameDialog({ children }) {
  return <div className="frame-dialog">{children}</div>;
}

RightFrame.Dialog = FrameDialog;
