import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FeedsScreen from "../Screens/FeedsScreen";
import AddPostScreen from "../Screens/AddPostScreen";
import AccountScreen from "../Screens/AccountScreen";

import { StyleSheet, View } from 'react-native'
import AddPostButton from "./AddPostButton";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";

const Tab = createBottomTabNavigator();

const CommunityNavigator = () => {

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPostScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <AddPostButton
              onPress={() => navigation.navigate('AddPost')}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
)};


export default CommunityNavigator;
