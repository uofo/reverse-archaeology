import React from 'react';
import { Link } from 'react-router';

import PinnedOverlay from './PinnedOverlay';

import '../styles/components/home.scss';

function Home() {
  return (
    <div>
      <div className="home">
        <div className="home-screen">
          <PinnedOverlay overlaid={document.body} left={545} top={325}>
            <div className="home-icon-menu">
              <Link to={'/archive'} className="archive-link"></Link>
              <Link to={'/chasm'} className="chasm-link"></Link>
              <Link to={'/prism'} className="prism-link"></Link>
              <div style={{ clear: 'both' }}></div>
            </div>
          </PinnedOverlay>
          <PinnedOverlay overlaid={document.body} left={575} top={570}>
            <ul className="home-menu">
              <li><Link to="/archive" className="archive-text-link"></Link></li>
              <li><Link to="/chasm" className="chasm-text-link"></Link></li>
              <li><Link to="/prism" className="prism-text-link"></Link></li>
            </ul>
          </PinnedOverlay>
        </div>
      </div>
    </div>
  );
}

export default Home;
