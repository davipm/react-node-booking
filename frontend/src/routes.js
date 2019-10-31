import React from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import New from "./pages/New";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/new" component={New} />
        <Route path="*">
          <div className="container">
            <Link to="/" className="form__btn form__btn--link">Página não encontrada</Link>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
