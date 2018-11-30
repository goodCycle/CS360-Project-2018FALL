import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'store/index';
import Layout from 'containers/layout';
import App from 'containers/app';
import StudentContainer from './containers/students/StudentContainer';
import MasterContainer from './containers/masters/MasterContainer';
import SignUpContainer from './containers/component/SignUpContainer';

const routes = (
  <ConnectedRouter history={history}>
    <Layout>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/students" component={StudentContainer} />
        <Route path="/masters" component={MasterContainer} />
        <Route path="/signup" component={SignUpContainer} />
      </Switch>
    </Layout>
  </ConnectedRouter>
);

export default routes;
