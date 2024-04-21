import React, { useState } from "react";
import ThemeContext, { themes } from '../context/ThemeContext'

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  const setLightTheme = () => setTheme(themes.light);

  const setDarkTheme = () => setTheme(themes.dark);

  return (
    <ThemeContext.Provider value={{ theme, setLightTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;