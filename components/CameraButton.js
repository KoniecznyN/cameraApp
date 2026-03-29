import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const CameraButton = ({ size, func, type }) => {
  return (
    <View
      style={[
        styles.Main,
        { width: size == 1 ? 100 : 150, height: size == 1 ? 100 : 150 },
      ]}
    >
      <TouchableOpacity
        style={styles.Icon}
        onPress={() => {
          func();
        }}
      >
        <Ionicons
          style={type == "take" ? { display: "flex" } : { display: "none" }}
          name="camera-sharp"
          size={96}
          color="black"
        />
        <Ionicons
          style={type == "reverse" ? { display: "flex" } : { display: "none" }}
          name="camera-reverse-sharp"
          size={64}
          color="black"
        />
        <Ionicons style={type == "settings" ? { display: "flex" } : { display: "none" }}
          name="settings-sharp"
          size={64}
          color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CameraButton;

const styles = StyleSheet.create({
  Main: {
    backgroundColor: "white",
    opacity: 0.3,
    borderRadius: "100%",
    margin: 5,
    marginBottom: 10,
  },
  Icon: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
