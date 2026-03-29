import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import Button from "./Button";

const BigPhoto = ({ route, navigation }) => {
  const { id, uri, photoWidth, photoHeight } = route.params;
  const { width, height } = Dimensions.get("window");

  const aspectRatio = photoWidth / photoHeight;

  useEffect(() => {
    console.log(id, uri);
  }, []);

  const deletePhoto = async () => {
    await MediaLibrary.deleteAssetsAsync(id);
    navigation.replace("gallery");
  };

  const share = () => {
    Sharing.shareAsync(uri);
  };
  return (
    <View style={styles.Main}>
      <View style={styles.Photo}>
        <Image
          style={{
            width: "100%",
            aspectRatio: aspectRatio,
            borderRadius: 15,
            backgroundColor: "black",
          }}
          source={{ uri: uri }}
        ></Image>
        <View
          style={{
            position: "absolute",
            backgroundColor: "#222222",
            padding: 20,
            borderRadius: 20,
            opacity: 0.8,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            {photoHeight}x{photoWidth}{" "}
          </Text>
        </View>
      </View>
      <View style={styles.Menu}>
        <Button text="share" color="black" func={share} />
        <Button text="delete" color="darkred" func={deletePhoto} />
      </View>
    </View>
  );
};

export default BigPhoto;

const styles = StyleSheet.create({
  Main: {
    flex: 1,
  },
  Photo: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    flex: 8,
  },
  Menu: {
    flex: 1,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
