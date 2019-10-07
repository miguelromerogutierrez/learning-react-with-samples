import React from 'react'
import { Link } from 'react-router-dom';
import ButtonLogout from '../../auth-user/button-logout';

import './header.scss';

export default function header() {
  return (
    <div className="header">
      <ButtonLogout className="button-logout" />
      <ul>
        <li><Link to="/social-cards">Social Cards</Link></li>
        <li><Link to="/register-form">Register Form</Link></li>
        <li><Link to="/hacker-news">Hacker News</Link></li>
        <li><Link to="/auth-page">Auth page</Link></li>
        <li><Link to="/hooks">Hooks</Link></li>
        <li><Link to="/calendar-hoc">Calendar Hoc</Link></li>
        <li><Link to="/calendar-rp">Calendar RP</Link></li>
        <li><Link to="/calendar-hooks">Calendar Hooks</Link></li>
      </ul>
    </div>
  )
}
