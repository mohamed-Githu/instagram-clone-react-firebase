import React from 'react'

import './header.scss'

const Header = ({ children }) => {
  return (
    <div className="header">
      <img
        className="header__logo"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt="Instgram Logo" 
      />
      {children}
    </div>
  )
}

export default Header
