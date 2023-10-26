import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
// import {
//   Avatar,
//   Title,
//   Caption,
//   Paragraph,
//   TouchableRipple,
//   Switch,
// } from "react-native-paper";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import HomeScreen from "./HomeScreen";
import Aboutscreen from "./about";
import History from "./searchHistory";
import FeedbackScreen from "./feedback";
import CustomeDrawer from "./CustomeDrawer";
import icons from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const CustomHeader = ({ navigation }) => (
  <View style={styles.header}>
    <View style={styles.logoContainer}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
    </View>
    <Text style={styles.appName}>Misslaundry</Text>
  </View>
);

const DrawerNavigator = ({ navigation }) => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomeDrawer {...props} />}
    screenOptions={{
      headerStyle: {
        backgroundColor: '#9dd49d',
      },
      drawerActiveBackgroundColor: '#9dd49d',
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: { marginLeft: -25 },
      gestureEnabled: true,
    }}
  >
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerTitle: CustomHeader,
        drawerIcon: ({ color }) => (
          <Ionicons name="home-outline" size={22} color={color} />
        ),
      }}
    />
    
    <Drawer.Screen
      name="About Us"
      component={Aboutscreen}
      options={{
        headerTitle: CustomHeader,
        drawerIcon: ({ color }) => (
          <Ionicons name="person-outline" size={22} color={color} />
        ),
      }}
    />

    <Drawer.Screen
      name="History"
      component={History}
      options={{
        headerTitle: CustomHeader,
        drawerIcon: ({ color }) => (
          <Ionicons name="book-outline" size={22} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Feedback"
      component={FeedbackScreen}
      options={{
        headerTitle: CustomHeader,
        drawerIcon: ({ color }) => (
          <Ionicons name="chatbox-outline" size={22} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Logout"
      options={{
        headerShown: false,
        drawerLabel: 'Logout',
        drawerIcon: ({ color }) => (
          <Ionicons name="log-out-outline" size={22} color={color} />
        ),
      }}
    >
      {({ navigation }) => {
        const handleLogout = async () => {
          try {
            await AsyncStorage.removeItem('otp_code');
            navigation.reset({
              index: 0,
              routes: [{ name: 'SplashScreen' }],
            });
          } catch (error) {
            console.error('Error removing otp_code from AsyncStorage:', error);
          }
        };
        handleLogout();
        return null;
      }}
    </Drawer.Screen>
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  header: {
    flex: 2,
    backgroundColor: '#9dd49d',
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
    marginRight: "0%",
  },

  logo: {
    width: 60,
    height: 60,
  },

  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    padding: 5,
  },
});

export default DrawerNavigator;
