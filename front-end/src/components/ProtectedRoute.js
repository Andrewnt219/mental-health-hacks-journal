import { useAuth } from "context/AuthContext";
import React from "react";
import { Redirect, Route } from "react-router";

const ProtectedRoute = ({ children, ...rest }) => {
  const { token } = useAuth();

  return (
    <Route
      {...rest}
      render={() => {
        return token ? children : <Redirect to="/user/login" />;
      }}
    />
  );
};
export default ProtectedRoute;
