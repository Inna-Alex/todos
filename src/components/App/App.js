import React from 'react';

import styles from './app.module.scss'
import "../../fonts/Quicksand/Quicksand-Light.ttf"

import AppHeader from '../AppHeader/AppHeader';
import HeaderButtons from '../HeaderButtons/HeaderButtons';
import AppContent from '../AppContent/AppContent';

function App() {
  return (
    <>
      <div>
        <AppHeader>ToDo List</AppHeader>
        <div className={styles.app__wrapper}>
          <HeaderButtons />
          <AppContent />
        </div>
      </div>
    </>
  );
}

export default App;
