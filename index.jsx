import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from "history";
import 'current-input';
import { Provider } from 'react-redux';

import { actions, store } from './core/store';

import About from './components/About';
import App from './components/App';
import Chasm from './components/Chasm';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import Prism from './components/Prism';
import ArtifactComponent from './components/ArtifactComponent';
import ArtifactThemeComponent from './components/ArtifactThemeComponent';
import ArtifactsComponent from './components/ArtifactsComponent';
import config from './config';

const browserHistory = useRouterHistory(createHistory)({
    basename: config.basename
});

const routes = (
  <Route actions={actions} path="/" component={App}>
    <IndexRoute component={ArtifactsComponent} />

    <Route path="about" component={About} title="About" />
    <Route path="chasm" component={Chasm} title="Chasm" />
    <Route path="prism" component={Prism} title="Prism" />

    <Route path="archive" component={ArtifactsComponent} />
    <Route path="artifacts/theme/:slug" component={ArtifactThemeComponent} />
    <Route path="artifacts/:slug" component={ArtifactComponent} />

    <Route path="*" component={PageNotFound} />
  </Route>
);


render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={routes}
    />
  </Provider>,
  document.getElementById('root')
);
