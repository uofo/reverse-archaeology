import React from 'react';
import { Link } from 'react-router';

import PinnedOverlay from './PinnedOverlay';

import '../styles/components/home.scss';

const iconMenuPositions = {
  phone: {
    left: 200,
    top: 800
  },
  default: {
    left: 545,
    top: 325
  }
};

const textMenuPositions = {
  phone: {
    left: 200,
    top: 1600
  },
  default: {
    left: 695,
    top: 570
  }
};

function Home() {
  const windowWidth = document.body.clientWidth;
  const iconMenuPosition = ((windowWidth <= 400) ?
      iconMenuPositions.phone :
      iconMenuPositions.default);
  const textMenuPosition = ((windowWidth <= 400) ?
      textMenuPositions.phone :
      textMenuPositions.default);

  return (
    <div>
      <div className="home">
        <div className="home-screen">
          <PinnedOverlay overlaid={document.body} left={iconMenuPosition.left} top={iconMenuPosition.top}>
            <div className="home-icon-menu">
              <Link to={'/archive'} className="archive-link"></Link>
              <Link to={'/chasm'} className="chasm-link"></Link>
              <Link to={'/prism'} className="prism-link"></Link>
              <div style={{ clear: 'both' }}></div>
            </div>
          </PinnedOverlay>
          <PinnedOverlay overlaid={document.body} left={textMenuPosition.left} top={textMenuPosition.top}>
            <ul className="home-menu">
              <li>
                <Link to="/archive" className="archive-text-link">
                  <img src="/img/archive-text.png" />
                </Link>
              </li>
              <li>
                <Link to="/chasm" className="chasm-text-link">
                  <img src="/img/chasm-text.png" />
                </Link>
              </li>
              <li>
                <Link to="/prism" className="prism-text-link">
                  <img src="/img/prism-text.png" />
                </Link>
              </li>
            </ul>
          </PinnedOverlay>
        </div>
      </div>
    </div>
  );
}

export default Home;
