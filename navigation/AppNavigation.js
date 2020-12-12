import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../Screens/Home';
import CommunityNavigator from './CommunityNavigation';
import AuthNavigator from './AuthNavigation';

const Drawer = createDrawerNavigator();
function AppNavigation(props) {
    
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Welcome" component={AuthNavigator} />
            <Drawer.Screen name="Community" component={CommunityNavigator} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    
})

export default AppNavigation;