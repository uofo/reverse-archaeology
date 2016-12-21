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
        <Header artifacts={this.props.artifacts} pages={this.props.pages} />
        <main>
          {
            React.cloneElement(this.props.children, {
              artifacts: this.props.artifacts,
              bios: this.props.bios,
              funders: this.props.funders,
              pages: this.props.pages,
              themes: this.props.themes
            })
          }
        </main>
        <Footer />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    artifacts: state.artifacts,
    bios: state.bios,
    funders: state.funders,
    pages: state.pages,
    themes: state.themes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
