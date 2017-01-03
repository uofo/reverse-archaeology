import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Nav from './Nav';
import Search from './Search';

import '../styles/components/header.scss';

const propTypes = {
  artifacts: PropTypes.object.isRequired,
  pages: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired,
};

function Header({ artifacts, pages, section }) {
  return (
    <header>
      <h1>
        <Link to="/">Hidden Treasures of our Orange</Link>
      </h1>
      <Nav pages={pages} section={section} />
      <Search artifacts={artifacts.data.items} />
      <div style={{clear: 'both'}}></div>
    </header>
  );
}

Header.propTypes = propTypes;

export default Header;
