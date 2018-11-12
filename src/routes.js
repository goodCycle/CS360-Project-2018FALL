import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'store/index';
import Layout from 'containers/layout';
import App from 'containers/app';
import StudentsContainer from './containers/students/StudentsContainer';

const routes = (
  <ConnectedRouter history={history}>
    <Layout>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/students" component={StudentsContainer} />
      </Switch>
    </Layout>
  </ConnectedRouter>
);

export default routes;
