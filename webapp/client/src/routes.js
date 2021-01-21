import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import New from "./pages/New";
import NotFound from "./pages/404";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/new" component={New} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}
