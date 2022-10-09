import React from "react";
import { validate } from "../../query/sign";
import { updateAuthInstance, updateInstance } from "../../service/instance";
import { responseHandler } from "../../utilities/response-handler";

export const authContext = React.createContext();

const Index = ({ children }) => {
  const [token, handleToken] = React.useState(localStorage.getItem("tkn"));
  const setToken = (tkn) => {
    handleToken(tkn);
    localStorage.setItem("tkn", tkn);
  };

  const [user, setUser] = React.useState({});
  const [userId, setUserId] = React.useState();

  React.useEffect(() => {
    updateInstance();
    updateAuthInstance();
    if (token) {
      validateUser();
    }
  }, [token]);

  const validateUser = async () => {
    const res = await responseHandler(() => validate());
    if (res.status) {
      setUserId(res.data.value.user_details.id);
      setUser({
        ...user,
        ...res.data.value.user_details,
      });
      // console.log(res.data.value.user_details);
      // queryClient.invalidateQueries("user-info");
    } else {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("tkn");
    handleToken();
    setUser({});
    setUserId();
  };

  return (
    <authContext.Provider
      value={{
        token,
        setToken,
        logout,
        userInfo: user,
        userId,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default Index;
