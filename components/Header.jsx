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
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  closeMenu() {
    this.setState((prevState) => {
      return {
        menuOpen: false,
      }
    });
  }

  toggleMenu() {
    this.setState((prevState) => {
      return {
        menuOpen: !prevState.menuOpen,
      }
    });
  }

  render() {
    return (
      <header className={this.state.menuOpen ? 'menu-open' : ''}>
        <h1>
          <Link className="logo-link" to="/"></Link>
        </h1>
        <div className="header-menu">
          <Nav onLinkClick={this.closeMenu.bind(this)} pages={this.props.pages} section={this.props.section} />
          <SearchBar artifacts={this.props.artifacts.data.items} />
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
};

export default Header;
