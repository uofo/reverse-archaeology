import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Nav from './Nav';
import { SearchBar } from './Search';

import '../styles/components/header.scss';

class MenuButton extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    this.props.toggle();
  }

  render() {
    return (
      <div className="header-menu-button" onClick={this.onClick.bind(this)}>
        <div className="header-menu-button-line"></div>
        <div className="header-menu-button-line"></div>
        <div className="header-menu-button-line"></div>
      </div>
    );
  }
}

MenuButton.propTypes = {
  toggle: PropTypes.func.isRequired,
};


class Header extends React.Component {
  toggleMenu() {
    if (this.props.menuOpen) {
      this.props.closeMenu();
    }
    else {
      this.props.openMenu();
    }
  }

  render() {
    return (
      <header className={this.props.menuOpen ? 'menu-open' : ''}>
        <h1>
          <Link className="logo-link" to="/" onClick={this.props.closeMenu}></Link>
        </h1>
        <div className="header-menu">
          <div className="header-menu-inner">
            <Nav onLinkClick={this.props.closeMenu} pages={this.props.pages} section={this.props.section} />
            <SearchBar artifacts={this.props.artifacts.data.items} />
          </div>
        </div>
        <MenuButton toggle={this.toggleMenu.bind(this)} />
        <div style={{clear: 'both'}}></div>
      </header>
    );
  }
}

Header.propTypes = {
  artifacts: PropTypes.object.isRequired,
  pages: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
  openMenu: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
};

export default Header;
