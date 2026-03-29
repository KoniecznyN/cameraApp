import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Button = ({ text, func, color }) => {
  return (
    <View style={[styles.Main, { backgroundColor: color }]}>
      <TouchableOpacity
        onPress={() => {
          func();
        }}
      >
        <Text style={styles.Text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 50,
    height: 50,
  },
  Text: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
  },
});
