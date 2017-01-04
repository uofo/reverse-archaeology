import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Search from './Search';

import '../styles/components/footer.scss';

const propTypes = {
  artifacts: PropTypes.object.isRequired,
};

function Footer({ artifacts }) {
  return (
    <footer>
      <div className="footer-left">
        Hidden Treasures of Our Orange
      </div>
      <div className="footer-center">
        <Search artifacts={artifacts.data.items} />
      </div>
      <div className="footer-right">
        right side
      </div>
      <div style={{clear: 'both'}}></div>
    </footer>
  );
}

Footer.propTypes = propTypes;

export default Footer;
