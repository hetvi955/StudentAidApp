import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigation from './navigation/AppNavigation';
import NavigationTheme from './navigation/NavigationTheme';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import AuthNavigator from './navigation/AuthNavigation';

export default function App() {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <AppNavigation />
    </NavigationContainer>
  );
}

