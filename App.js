import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigation from './navigation/AppNavigation';
import NavigationTheme from './navigation/NavigationTheme';

export default function App() {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <AppNavigation />
    </NavigationContainer>
  );
}

