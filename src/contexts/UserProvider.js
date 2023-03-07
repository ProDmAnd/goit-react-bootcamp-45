import { createContext, useContext, useState } from 'react';

const UserContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);

  return (
    <UserContext.Provider value={{ isLoggedIn: loggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
