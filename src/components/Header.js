import React from 'react';
import '../styles/Header.css';
import title from '../title.png';

function Header() {
  return (
    <header>
      <img
        src="https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-3-1.png"
        alt="Star Wars Logo"
        className="logo"
      />
      <img
        src={ title }
        alt="Planet Search"
        className="title"
      />
    </header>
  );
}

export default Header;
