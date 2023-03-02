import { createContext, useContext, useState } from 'react';

export const themes = {
  dark: 'dark',
  light: 'light',
};

const ThemeContext = createContext({ theme: themes.dark, toggle: () => {} });

export const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children, initialTheme = themes.dark }) => {
  const [theme, setTheme] = useState(initialTheme);
  const toggle = () =>
    setTheme(prev => (prev === themes.light ? themes.dark : themes.light));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
