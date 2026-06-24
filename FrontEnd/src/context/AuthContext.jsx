import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const [roles, setRoles] = useState(() => {
    const roles = localStorage.getItem("role");
    return roles ? JSON.parse(roles) : [];
  });

  console.log("AuthContext initialized with:", { token, user, roles });

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
