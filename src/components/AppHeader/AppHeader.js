import React, { useContext } from 'react';
import classnames from 'classnames';
import styles from './appHeader.module.scss'
import ThemeContext from '../../context/ThemeContext';

function setBodyTheme(theme) {
  const bodyElem = document.querySelector('body');
  bodyElem.style.setProperty('background-color', theme.background)
}

function AppHeader({ children, ...rest }) {
  const { theme } = useContext(ThemeContext)
  setBodyTheme(theme)

  return (
    <p className={classnames(
      styles.appHeader, styles[`appHeader${theme.name}`]
    )} {...rest}>
      {children}
    </p>
  );
}

export default AppHeader;