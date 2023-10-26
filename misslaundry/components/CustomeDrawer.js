import React from "react";
import { View, Text, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import icons from 'react-native-vector-icons/Ionicons';
import  FontAwesome5  from 'react-native-vector-icons/FontAwesome5';

const CustomeDrawer = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f0ed' }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#f5f0ed" }}
      >
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require("../assets/logo.png")}
            style={{
              height: 80,
              width: 80,
              borderRadius: 0,
              marginBottom: 10,
              marginLeft: 20,
            }}
          />
          <Text style={{padding: 30, fontSize: 20, fontWeight: 600}}>Hello User!!</Text>
        </View>
        <View style={{flex: 1, backgroundColor: '#f5f0ed', paddingTop: 10}}>
        <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomeDrawer;
