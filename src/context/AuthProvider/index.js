import React from "react";
import { useValidate } from "../../query/sign";
import { updateInstanceAuthorization } from "../../service/instance";

export const authContext = React.createContext();

const Index = ({ children }) => {
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [user, setUser] = React.useState({});

  const { data: validateData, isError: validationError } = useValidate(!!token);

  const setLoginToken = (tkn) => {
    localStorage.setItem("token", tkn);
    updateInstanceAuthorization();
    setToken(tkn);
  };

  const logout = () => {
    localStorage.removeItem("token");
    updateInstanceAuthorization();
    setToken();
  };

  React.useEffect(() => {
    if (!validationError) return;
    logout();
  }, [validationError]);

  React.useEffect(() => {
    if (!validateData) return;
    setUser(validateData);
  }, [validateData]);

  return (
    <authContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        setToken: setLoginToken,
        userInfo: user,
        logout: logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default Index;
