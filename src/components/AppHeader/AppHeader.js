import React from 'react';
import styles from './appHeader.module.scss'

function AppHeader({ children, ...rest }) {
  return (
    <p className={styles.appHeader} {...rest}>
      {children}
    </p>
  );
}

export default AppHeader;