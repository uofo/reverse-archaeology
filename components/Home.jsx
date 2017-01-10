import React from 'react';
import { Link } from 'react-router';

import PinnedOverlay from './PinnedOverlay';

import '../styles/components/home.scss';

function Home() {
  return (
    <div>
      <div className="home">
        <div className="home-screen">
          <PinnedOverlay overlaid={document.body} left={525} top={325}>
            <div className="home-icon-menu">
              <Link to={'/archive'} className="archive-link"></Link>
            </div>
          </PinnedOverlay>
          <PinnedOverlay overlaid={document.body} left={600} top={570}>
            <ul className="home-menu">
              <li><Link to="/archive">Enter the archive</Link></li>
              <li><Link to="/chasm">The chasm is real</Link></li>
              <li><Link to="/prism">The prism is magic</Link></li>
            </ul>
          </PinnedOverlay>
        </div>
      </div>
    </div>
  );
}

export default Home;
