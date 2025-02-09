import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <img src="/react.png" alt="React logo" />
      <nav>
        <ul>
          <li><Link to="/">Strona główna</Link></li>
          <li><Link to="/about">O aplikacji</Link></li>
        </ul>
      </nav>
    </header>
  );
}
