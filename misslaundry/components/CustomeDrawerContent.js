import React from "react";
import { View, Text } from "react-native";

const CustomDrawerContent = ({ userName }) => {
  return (
    <View>
      {/* Display the user's name */}
      <Text>{userName}</Text>

      {/* Add more items to the drawer as needed */}
    </View>
  );
};

export default CustomDrawerContent;