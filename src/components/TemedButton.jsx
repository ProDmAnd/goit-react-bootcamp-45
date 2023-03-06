import { themes, useThemeContext } from 'contexts/ThemeProvider';
import React from 'react';
import Button from './Button/Button';

const ThemedButton = props => {
  const { theme } = useThemeContext();
  return (
    <Button color={theme === themes.dark ? '#03F8' : '#F308'} {...props} />
  );
};

export default ThemedButton;
