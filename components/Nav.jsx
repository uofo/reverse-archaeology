import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../styles/components/nav.scss';

const propTypes = {
  pages: PropTypes.object,
};

function topLevelPages (pages) {
  return pages.data.items.filter(page => page.level === 1);
}

function Nav({ pages }) {
  if (!pages) {
    return <ul className="nav"></ul>;
  }

  return (
    <div className="navbar">
      <ul className="nav">
        {topLevelPages(pages).map(page => (
          <li key={page.title}>
            <Link to={'/' + page.slug}>
              {page.title}
            </Link>
          </li>
        ))}
        <li>
          <Link to={'/artifacts/'}>Artifacts</Link>
        </li>
      </ul>
      <div style={{ clear: 'both' }}></div>
    </div>
  );
}

Nav.propTypes = propTypes;

export default Nav;
