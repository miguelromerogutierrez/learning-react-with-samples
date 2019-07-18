import React from 'react'
import { Link } from 'react-router-dom';

import './header.scss';

export default function header() {
  return (
    <div className="header">
      <ul>
        <li><Link to="/social-cards">Social Cards</Link></li>
        <li><Link to="/register-form">Register Form</Link></li>
        <li><Link to="/hacker-news">Hacker News</Link></li>
        <li><Link to="/hooks">Hooks</Link></li>
      </ul>
    </div>
  )
}
