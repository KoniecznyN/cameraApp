import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const PhotoItem = ({
  id,
  uri,
  press,
  select,
  unselect,
  layout,
  photoWidth,
  photoHeight,
}) => {
  const [selected, selectItem] = useState(false);
  const { width, height } = Dimensions.get("window");

  return (
    <View style={[styles.Main]}>
      <TouchableOpacity
        onPress={() => {
          press(id, uri, photoWidth, photoHeight);
        }}
        onLongPress={() => {
          if (selected) {
            unselect(id);
            selectItem(false);
          } else {
            select(id);
            selectItem(true);
          }
        }}
      >
        <Image
          style={{
            width: width / layout - 15,
            height: width / layout - 15,
            borderRadius: 15,
          }}
          source={{ uri: uri }}
        ></Image>
        <View
          style={[
            {
              backgroundColor: "darkred",
              width: width / layout - 15,
              height: width / layout - 15,
              borderRadius: 15,
              position: "absolute",
              opacity: 0,
            },
            selected && { opacity: 0.7 },
          ]}
        ></View>
      </TouchableOpacity>
    </View>
  );
};

export default PhotoItem;

const styles = StyleSheet.create({
  Main: {
    margin: 5,
  },
});
