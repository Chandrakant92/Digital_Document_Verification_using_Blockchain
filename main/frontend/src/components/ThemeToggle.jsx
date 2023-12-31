import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Switch } from "@material-tailwind/react";
 
const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div>
      <Switch
        checked={isDarkMode}
        onChange={toggleDarkMode}
         />
    </div>
  );
};

export default ThemeToggle;
