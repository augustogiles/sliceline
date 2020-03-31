import React, { useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import History from './Pages/History';
import Main from './Pages/Main';

function Routes(distProps) {
  const Routs = useMemo(
    () => (
      <Switch>
        <Redirect from="/react-pizza" exact to="/" />
        <Route path="/history" component={History} />
        <Route
          path="/"
          exact
          component={props => <Main {...props} {...distProps} />}
        />
      </Switch>
    ),
    [distProps]
  );
  return Routs;
}

export default Routes;
