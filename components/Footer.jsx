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
        <div className="footer-logo"></div>
        <div className="footer-separator"></div>
      </div>
      <div className="footer-center">
        <Search artifacts={artifacts.data.items} />
      </div>
      <div className="footer-right">
        <div className="footer-social-media">
          <ul>
            <li>
              <a className="mail" href="mailto:universityoforange@gmail.com" target="_blank"></a>
            </li>
            <li>
              <a className="facebook" href="https://www.facebook.com/pages/University-of-Orange/209708885716392" target="_blank"></a>
            </li>
            <li>
              <a className="twitter" href="http://twitter.com" target="_blank"></a>
            </li>
            <li>
              <a className="instagram" href="http://instagram.com" target="_blank"></a>
            </li>
            <div style={{ clear: 'both' }}></div>
          </ul>
        </div>
        <div className="footer-separator"></div>
      </div>
      <div style={{clear: 'both'}}></div>
    </footer>
  );
}

Footer.propTypes = propTypes;

export default Footer;
