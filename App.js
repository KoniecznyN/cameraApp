import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Gallery from "./screens/Gallery";
import Camera from "./screens/Camera";
import BigPhoto from "./components/BigPhoto";
import Map from "./screens/Map";

import React from "react";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="gallery"
          component={Gallery}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="camera"
          component={Camera}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="bigphoto" component={BigPhoto} />
        <Stack.Screen name="map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
