import React from 'react'

export default function Form(props) {
  return (
    <div className="register-page">
        <h1>{props.title}</h1>
        <form onSubmit={props.onSubmit}>
          {props.children}
        </form>
      </div>
  )
}
