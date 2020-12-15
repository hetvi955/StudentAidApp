import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../Screens/Home';
import CommunityNavigator from './CommunityNavigation';
import AuthNavigator from './AuthNavigation';
import Updates from '../Screens/UpdateApi';
import AuthContext from '../Auth/context';

const Drawer = createDrawerNavigator();
function AppNavigation(props) {
    const authContext = useContext(AuthContext);
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            {authContext.user ? 
            (<Drawer.Screen name="Community" component={CommunityNavigator} />) 
            : (<Drawer.Screen name="Community" component={AuthNavigator} />)}
            <Drawer.Screen name="Jobs/Internships" component={Updates} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    
})

export default AppNavigation;