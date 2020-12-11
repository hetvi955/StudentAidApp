import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FeedsScreen from '../Screens/FeedsScreen';
import PostDetailScreen from '../Screens/PostDetailScreen';

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Feeds" component={FeedsScreen} />
    <Stack.Screen 
      name="PostDetail" 
      component={PostDetailScreen}
      options={{
        title: ''
      }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
