import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../Screens/Home';
import DailyWork from '../Screens/dailyWorkScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import CommunityNavigator from './CommunityNavigation';

const Drawer = createDrawerNavigator();
function AppNavigation(props) {

    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Welcome" component={WelcomeScreen} />
            <Drawer.Screen name="Community" component={CommunityNavigator} />
            <Drawer.Screen name="Daily work" component={DailyWork} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({

})

export default AppNavigation;