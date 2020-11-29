import React from 'react'
import { useState } from "react";
import {createDrawerNavigator} from '@react-navigation/drawer';
const MyDrawer = createDrawerNavigator();
import Authentication from "./Authentication";
import Home from "./Home"
function Drawer() {
    let i=0;
    const [signed, setsigned] = useState(false)
    return (
      <MyDrawer.Navigator initialRouteName="Authentication">
        {signed ? (
        <>
          <MyDrawer.Screen name="Home" component={Home} />
          <MyDrawer.Screen name="Profile" component={Home} />
          <MyDrawer.Screen name="Settings" component={Home} />
        </>
        ) : (
        <>
          <MyDrawer.Screen name="SignIn" component={Authentication} />
          <MyDrawer.Screen name="SignUp" component={Authentication} />
        </>
        )}
      </MyDrawer.Navigator>
    );
    };

export default Drawer
