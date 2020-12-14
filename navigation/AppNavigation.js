import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../Screens/Home';
import CommunityNavigator from './CommunityNavigation';
import AuthNavigator from './AuthNavigation';
import Updates from '../Screens/UpdateApi';

const Drawer = createDrawerNavigator();
function AppNavigation(props) {
    
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Welcome" component={AuthNavigator} />
            <Drawer.Screen name="Community" component={CommunityNavigator} />
            <Drawer.Screen name="Jobs/Internships" component={Updates} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    
})

export default AppNavigation;