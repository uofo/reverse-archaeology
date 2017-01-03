import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../styles/components/nav.scss';

const propTypes = {
  section: PropTypes.string.isRequired,
};

function Nav({ section }) {
  return (
    <div className="navbar">
      <ul className="nav">
        <li className={ section === 'about' ? 'active' : '' }>
          <Link to={'/about/'}>About</Link>
        </li>
        <li className={ section === 'archive' ? 'active' : '' }>
          <Link to={'/archive/'}>Archive</Link>
        </li>
        <li className={ section === 'chasm' ? 'active' : '' }>
          <Link to={'/chasm/'}>Chasm</Link>
        </li>
        <li className={ section === 'prism' ? 'active' : '' }>
          <Link to={'/prism/'}>Prism</Link>
        </li>
      </ul>
      <div style={{ clear: 'both' }}></div>
    </div>
  );
}

Nav.propTypes = propTypes;

export default Nav;
