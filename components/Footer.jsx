import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { SearchBar } from './Search';

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
        <SearchBar artifacts={artifacts.data.items} autocomplete={false} />
      </div>
      <div className="footer-right">
        <div className="footer-social-media">
          <ul>
            <li>
              <a className="mail" href="http://universityoforange.us10.list-manage.com/subscribe?u=80b878a13ce943d415039dccd&id=5827de607a" target="_blank"></a>
            </li>
            <li>
              <a className="web" href="http://www.universityoforange.org" target="_blank"></a>
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
