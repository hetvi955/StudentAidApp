import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../Screens/AccountScreen";
import CreateCommunity from "../Screens/CreateCommunity";
import CommunityPage from "../Screens/CommunityPage";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen 
      name="Account" 
      component={AccountScreen}
    />
    <Stack.Screen 
      name="CreateCommunity" 
      component={CreateCommunity}
      options={{
        title: ''
      }}
    />
    <Stack.Screen 
      name="CommunityPage" 
      component={CommunityPage}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
