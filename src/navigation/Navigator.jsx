import * as React from "react";
import { View, Text } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import HomeDetails from "../screens/HomeDetails.jsx";

const Stack = createNativeStackNavigator();

export default Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomeDetails" component={HomeDetails} />
    </Stack.Navigator>
  );
};
