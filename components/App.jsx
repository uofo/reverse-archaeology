import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../core/actions';

import Footer from './Footer';
import Header from './Header';

import '../styles/app.scss';

const propTypes = {
  children: PropTypes.element.isRequired,
  routes: PropTypes.array.isRequired,
};

var App = React.createClass({
  propTypes: propTypes,

  componentWillMount: function () {
    this.props.actions.fetchSiteData();
  },

  render: function () {
    return (
      <div>
        <Header artifacts={this.props.artifacts} pages={this.props.pages} section={this.props.section} closeMenu={this.props.actions.closeMenu} menuOpen={this.props.menuOpen} openMenu={this.props.actions.openMenu} />
        <main>
          {
            React.cloneElement(this.props.children, {
              artifacts: this.props.artifacts,
              bios: this.props.bios,
              blurbs: this.props.blurbs,
              chasmpolicies: this.props.chasmpolicies,
              funders: this.props.funders,
              pages: this.props.pages,
              prismprojects: this.props.prismprojects,
              section: this.props.section,
              slideshowimages: this.props.slideshowimages,
              themes: this.props.themes
            })
          }
        </main>
        <Footer artifacts={this.props.artifacts} />
      </div>
    );
  }
});

function mapStateToProps(state, ownProps) {
  const route = ownProps.routes[ownProps.routes.length - 1];
  return {
    artifacts: state.artifacts,
    bios: state.bios.sort((a, b) => a.order - b.order),
    blurbs: state.blurbs,
    chasmpolicies: state.chasmpolicies,
    funders: state.funders,
    menuOpen: state.menuOpen,
    pages: state.pages,
    prismprojects: state.prismprojects,
    section: route.section,
    slideshowimages: state.slideshowimages,
    themes: state.themes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
