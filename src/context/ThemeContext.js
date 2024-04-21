import React from 'react'

export const themes = {
  light: {
      name: 'Light',
      foreground: '#646681',
      background: '#f8f8ff',
  },
  dark: {
      name: 'Dark',
      foreground: 'white',
      background: '#2e2e66',
  },
};

const ThemeContext = React.createContext({
  theme: {},
  setTheme: () => {},
});

export default ThemeContext