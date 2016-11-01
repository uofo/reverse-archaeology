import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from "history";
import 'current-input';
import { Provider } from 'react-redux';

import { actions, store } from './core/store';

import App from './components/App';
import Home from './components/Home';
import PageComponent from './components/PageComponent';
import PageNotFound from './components/PageNotFound';
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

    <Route path="about" component={PageComponent} title="About" />

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
