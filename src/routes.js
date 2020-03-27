import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import History from './Pages/History';
import Main from './Pages/Main';

function Routes(distProps) {
  return (
    <>
      <Switch>
        <Redirect from="/react-pizza" to="/" />
        <Route path="/history" component={History} />
        <Route component={props => <Main {...props} {...distProps} />} />
      </Switch>
    </>
  );
}

export default Routes;
