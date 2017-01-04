import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../styles/components/footer.scss';

const propTypes = {
};

function Footer() {
  return (
    <footer>
      <div className="footer-left">
        Hidden Treasures of Our Orange
      </div>
      <div className="footer-center">
        Hidden Treasures of Our Orange
      </div>
      <div className="footer-right">
        right side
      </div>
    </footer>
  );
}

Footer.propTypes = propTypes;

export default Footer;
