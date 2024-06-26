import { createContext, useCallback, useEffect, useState } from "react";
import api from "../utils/api";
import fb from "../utils/fb";

export const AuthContext = createContext({
  isLogin: false,
  user: {},
  loading: false,
  jwtToken: "",
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [jwtToken, setJwtToken] = useState();

  const handleLoginResponse = useCallback(async (response) => {
    const accessToken = response.authResponse.accessToken;
    const { data } = await api.signin({
      provider: "facebook",
      access_token: accessToken,
    });
    const { access_token: tokenFromServer, user: userData } = data;
    setUser(userData);
    setJwtToken(tokenFromServer);
    window.localStorage.setItem("jwtToken", tokenFromServer);
    setIsLogin(true);
    return tokenFromServer;
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      await fb.init();
      const response = await fb.getLoginStatus();
      if (response.status === "connected") {
        handleLoginResponse(response);
        setLoading(false);
      } else {
        window.localStorage.removeItem("jwtToken");
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const login = async () => {
    setLoading(true);
    // TODO: Send data to Login API
    const response = await fb.login();
    if (response.status === "connected") {
      const tokenFromServer = handleLoginResponse(response);
      setLoading(false);
      return tokenFromServer;
    } else {
      window.localStorage.removeItem("jwtToken");
      setLoading(false);
      return null;
    }
  };

  const logout = async () => {
    setLoading(true);
    await fb.logout();
    setIsLogin(false);
    setUser({});
    setJwtToken();
    window.localStorage.removeItem("jwtToken");
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        user,
        loading,
        jwtToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
