import React from "react";
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from "@react-navigation/stack";

import WelcomeScreen from "../Screens/WelcomeScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import LoginScreen from "../Screens/LoginScreen";

const Stack = createStackNavigator();

const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
};

const AuthNavigator = () => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        }} 
    />
    <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        }} 
    />
    <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        }} 
    />
  </Stack.Navigator>
);

export default AuthNavigator;
