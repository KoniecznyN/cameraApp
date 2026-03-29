import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const RadioButton = ({ value, selectedValue, onChange, color }) => {
  const isSelected = selectedValue === value;

  return (
    <TouchableOpacity
      onPress={() => onChange(value)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
      }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isSelected ? color : "lightgray",
        }}
      >
        {isSelected && (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "white",
            }}
          />
        )}
      </View>
      <Text
        style={{ marginLeft: 10, fontSize: 16, color: "white", width: "100%" }}
      >
        {String(value)}
        {}
      </Text>
    </TouchableOpacity>
  );
};

export default RadioButton;
