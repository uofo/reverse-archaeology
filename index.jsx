import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createHistory } from "history";
import 'current-input';
import { Provider } from 'react-redux';

import { actions, store } from './core/store';

import About from './components/About';
import App from './components/App';
import Bio from './components/Bio';
import Chasm from './components/Chasm';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import Prism from './components/Prism';
import ArtifactComponent from './components/ArtifactComponent';
import ArtifactThemeComponent from './components/ArtifactThemeComponent';
import Archive from './components/Archive';
import config from './config';

const browserHistory = syncHistoryWithStore(useRouterHistory(createHistory)({
    basename: config.basename
}), store);

const routes = (
  <Route actions={actions} path="/" component={App}>
    <IndexRoute component={Home} section="home" />

    <Route path="about" component={About} title="About" section="about" />
    <Route path="about/bios/:slug" component={Bio} section="about" />

    <Route path="chasm" component={Chasm} title="Chasm" section="chasm" />
    <Route path="prism" component={Prism} title="Prism" section="prism" />

    <Route path="archive" component={Archive} section="archive" />
    <Route path="artifacts/theme/:slug" component={ArtifactThemeComponent} section="archive" />
    <Route path="artifacts/:slug" component={ArtifactComponent} section="archive" />

    <Route path="*" component={PageNotFound} />
  </Route>
);

function onRouteUpdate() {
  const section = this.state.routes[this.state.routes.length - 1].section;
  toggleSectionClass(section);
}

function toggleSectionClass(section) {
  const currentSection = `${section}-section`;
  document.body.classList.add();
  document.body.classList.forEach(function (className) {
    if (className !== currentSection && className.endsWith('-section')) {
      document.body.classList.remove(className);
    }
  });
  document.body.classList.add(currentSection);
}

render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      onUpdate={onRouteUpdate}
      routes={routes}
    />
  </Provider>,
  document.getElementById('root')
);
