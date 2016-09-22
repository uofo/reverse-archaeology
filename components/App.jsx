import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../core/actions';

import '../styles/app.scss';

const propTypes = {
  children: PropTypes.element.isRequired,
  routes: PropTypes.array.isRequired,
};

var App = React.createClass({
  propTypes: propTypes,

  componentWillMount: function () {
    this.props.actions.fetchArtifactsData();
  },

  render: function () {
    return (
      <div>
        <h1>Reverse Archaeology</h1>
        {
          React.cloneElement(this.props.children, {
            artifacts: this.props.artifacts
          })
        }
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    artifacts: state.artifacts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
