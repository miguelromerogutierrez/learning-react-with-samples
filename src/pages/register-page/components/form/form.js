import React from 'react'

export default function Form(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit();
  };
  return (
    <div className="register-page">
        <h1>{props.title}</h1>
        <form onSubmit={handleSubmit}>
          {props.children}
        </form>
      </div>
  )
}
