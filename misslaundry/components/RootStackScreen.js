import React, {useEffect,useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./splashScreen";

import Register from "./register";
import Mobile from "./mobilenumber";
import OtpScreen from "./otp";
import PickUpScreen from "./pickup";
import DrawerNavigator from "./DrawerNavigator";
const RootStack = createStackNavigator()

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator screenOptions={{headerShown: false,}}>
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="RegisterScreen" component={Register} />
    <RootStack.Screen name="Mobile" component={Mobile} />
    <RootStack.Screen name="OtpScreen" component={OtpScreen} />
    <RootStack.Screen name="PickUpScreen" component={PickUpScreen} />
    <RootStack.Screen name="Drawer" component={DrawerNavigator} />
  </RootStack.Navigator>
);

export default RootStackScreen;