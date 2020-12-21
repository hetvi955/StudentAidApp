import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { AppLoading } from 'expo';

import AppNavigation from './navigation/AppNavigation';
import NavigationTheme from './navigation/NavigationTheme';
import AuthContext from "./Auth/context";
import AuthStorage from "./Auth/storage";
import APPSQLite from "./sqlite/example";

export default function App() {
  const [ user, setUser ] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await AuthStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
  return (
    <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
  );
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={NavigationTheme}>
        <AppNavigation />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
