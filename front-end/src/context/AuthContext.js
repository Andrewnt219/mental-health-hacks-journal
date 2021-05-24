import { fireStoreApi } from "api/firestore-api";
import * as React from "react";
import { useHistory } from "react-router-dom";
const AuthContext = React.createContext();
export function AuthProvider(props) {
  const [token, setToken] = React.useState(localStorage.token ?? "");
  const [error, setError] = React.useState(null);
  const history = useHistory();

  const handleResponse = (res) => {
    setError(null);
    localStorage.token = res.data.token;
    setToken(res.data.token);
    history.push("/");
  };

  const handleError = (err) => {
    setToken(null);
    localStorage.removeItem("token");
    setError(err.response?.data.error);
  };

  const login = (loginCreds) => {
    fireStoreApi
      .post("/users/login", loginCreds)
      .then(handleResponse)
      .catch(handleError);
  };

  const signup = (signUpInfo) => {
    fireStoreApi
      .post("/users/signup", signUpInfo)
      .then(handleResponse)
      .catch(handleError);
  };

  const logout = () => {
    setToken(null);
    setError(null);
    localStorage.removeItem("token");
  }; // clear the token in localStorage and the user data
  // note, I'm not bothering to optimize this `value` with React.useMemo here
  // because this is the top-most component rendered in our app and it will very
  // rarely re-render/cause a performance problem.
  return (
    <AuthContext.Provider
      value={{ token, error, login, logout, signup }}
      {...props}
    />
  );
}
export const useAuth = () => React.useContext(AuthContext);
