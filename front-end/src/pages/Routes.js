import ProtectedRoute from "components/ProtectedRoute";
import Homepage from "pages/Homepage/index";
import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import EntryAddPage from "./entry/Add/index";
import EntryPage from "./entry/Index";
import UserLogin from "./user/Login";
import UserSignup from "./user/Signup";

const Routes = () => {
  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Switch>
        <ProtectedRoute path="/user/dashboard">
          <Dashboard />
        </ProtectedRoute>

        <Route path="/user/login">
          <UserLogin />
        </Route>
        <Route path="/user/signup">
          <UserSignup />
        </Route>

        <ProtectedRoute path="/entry/add">
          <EntryAddPage />
        </ProtectedRoute>
        <ProtectedRoute path="/entry">
          <EntryPage />
        </ProtectedRoute>

        <ProtectedRoute path="/" exact>
          <Homepage />
        </ProtectedRoute>

        <Route path="/404" component={() => <h1>Page not found</h1>} />

        <Redirect to="/404" />
      </Switch>
    </Suspense>
  );
};

export default Routes;
