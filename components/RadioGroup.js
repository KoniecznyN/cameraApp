import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import RadioButton from "./RadioButton";

const RadioGroup = ({ color, columns, change, data, groupName }) => {
  const [selectedValue, setSelectedValue] = useState(data?.[0] || null);

  useEffect(() => {
    if (data && data.length > 0 && selectedValue === null) {
      setSelectedValue(data[0]);
    }
  }, [data, selectedValue]);

  const handleChange = (value) => {
    setSelectedValue(value);
    if (change) change(value);
  };

  return (
    <View style={{ padding: 10 }}>
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        {groupName}
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              width: `${100 / columns}%`,
            }}
          >
            <RadioButton
              value={item}
              selectedValue={selectedValue}
              onChange={handleChange}
              color={color}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default RadioGroup;
