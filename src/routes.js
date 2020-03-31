import React, { useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import History from './Pages/History';
import Main from './Pages/Main';

function Routes({ setOpenFood }) {
  const Routs = useMemo(
    () => (
      <Switch>
        <Redirect from="/react-pizza" exact to="/" />
        <Route path="/history" component={History} />
        <Route
          path="/"
          exact
          component={() => <Main setOpenFood={setOpenFood} />}
        />
      </Switch>
    ),
    [setOpenFood]
  );
  return Routs;
}

export default Routes;
