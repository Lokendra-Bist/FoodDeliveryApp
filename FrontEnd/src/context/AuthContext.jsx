import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(token ? parseJwt(token) : null);
  const [roles, setRoles] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const openAuthModal = () => setShowAuthModal(true);

  const closeAuthModal = () => setShowAuthModal(false);

  const login = (authResponse) => {
    localStorage.setItem("token", authResponse.token);
    localStorage.setItem("user", JSON.stringify(authResponse));

    const roles = authResponse.roles || [];
    console.log(typeof roles, roles);
    localStorage.setItem("role", JSON.stringify(roles));

    setToken(authResponse.token);
    setUser(authResponse);
    setRoles(roles);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setToken(null);
    setUser(null);
    setRoles([]);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        roles,
        login,
        logout,
        showAuthModal,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
