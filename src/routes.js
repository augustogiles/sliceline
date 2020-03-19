import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import History from './Pages/History';
import Main from './Pages/Main';

function Routes() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Redirect from="/react-pizza" to="/" />
          <Route path="/history" component={History} />
          <Route component={Main} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Routes;
