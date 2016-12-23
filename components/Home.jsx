import React from 'react';
import { Link } from 'react-router';

import '../styles/components/home.scss';

function Home() {
  return (
    <div>
      <div className="home">
        <div className="home-screen">
          <ul>
            <li><Link to="/archive">Enter the archive</Link></li>
            <li><Link to="/chasm">The chasm is real</Link></li>
            <li><Link to="/prism">The prism is magic</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
