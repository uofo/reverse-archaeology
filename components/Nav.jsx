import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../styles/components/nav.scss';

const propTypes = {
};

function Nav() {
  return (
    <div className="navbar">
      <ul className="nav">
        <li>
          <Link to={'/about/'}>About</Link>
        </li>
        <li>
          <Link to={'/archive/'}>Archive</Link>
        </li>
        <li>
          <Link to={'/chasm/'}>Chasm</Link>
        </li>
        <li>
          <Link to={'/prism/'}>Prism</Link>
        </li>
      </ul>
      <div style={{ clear: 'both' }}></div>
    </div>
  );
}

Nav.propTypes = propTypes;

export default Nav;
