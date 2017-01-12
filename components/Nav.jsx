import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../styles/components/nav.scss';

const propTypes = {
  onLinkClick: PropTypes.func.isRequired,
  section: PropTypes.string.isRequired,
};

function Nav({ onLinkClick, section }) {
  return (
    <div className="navbar">
      <ul className="nav">
        <li className={ section === 'about' ? 'active' : '' }>
          <Link to={'/about/'} onClick={onLinkClick}>About</Link>
        </li>
        <li className={ section === 'archive' ? 'active' : '' }>
          <Link to={'/archive/'} onClick={onLinkClick}>Archive</Link>
        </li>
        <li className={ section === 'chasm' ? 'active' : '' }>
          <Link to={'/chasm/'} onClick={onLinkClick}>Chasm</Link>
        </li>
        <li className={ section === 'prism' ? 'active' : '' }>
          <Link to={'/prism/'} onClick={onLinkClick}>Prism</Link>
        </li>
      </ul>
      <div style={{ clear: 'both' }}></div>
    </div>
  );
}

Nav.propTypes = propTypes;

export default Nav;
