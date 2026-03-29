import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../components/Button.js";
import PhotoItem from "../components/PhotoItem.js";
import { StatusBar } from "expo-status-bar";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("my-key", jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("my-key");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
  }
};

const Gallery = ({ navigation }) => {
  const [hasPermissions, setHasPermissions] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, toggleSelectedPhotos] = useState([]);
  const [layout, setLayout] = useState(3);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermissions(status === "granted");
    })();
  }, []);

  const getPhotos = async () => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: "photo",
      first: 100,
    });
    const assets = media.assets;
    setPhotos(assets);
  };

  useEffect(() => {
    if (hasPermissions === true) {
      getPhotos();
    }
  }, [hasPermissions, photos]);

  const toggleSelected = (id) => {
    let photos = selectedPhotos;
    if (photos.find((photo) => photo == id) == undefined) {
      photos.push(id);
      toggleSelectedPhotos(photos);
    }
  };

  const cancelSelection = (id) => {
    let photos = selectedPhotos.filter((photo) => photo != id);
    toggleSelectedPhotos(photos);
  };

  const deleteSelected = async () => {
    await MediaLibrary.deleteAssetsAsync(selectedPhotos);
    toggleSelectedPhotos([]);
  };

  const goToCamera = () => {
    navigation.navigate("camera");
  };

  const goToPhoto = (id, uri, photoWidth, photoHeight) => {
    navigation.navigate("bigphoto", {
      id: id,
      uri: uri,
      photoWidth: photoWidth,
      photoHeight: photoHeight,
    });
  };

  const changeLayout = () => {
    if (layout == 3) {
      setLayout(1);
    } else setLayout(3);
  };

  return (
    <View style={styles.Main}>
      <StatusBar translucent={false} hidden={false} />
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: 900,
          marginTop: 10,
        }}
      >
        zdjęć: {photos.length}
      </Text>
      <View style={styles.Navigation}>
        <Button text="camera" color="black" func={goToCamera} />
        <Button text="layout" color="black" func={changeLayout} />
        <Button text="delete" color="darkred" func={deleteSelected} />
      </View>
      <View style={styles.Gallery}>
        <FlatList
          style={{ width: "100%" }}
          numColumns={layout}
          key={layout}
          data={photos}
          renderItem={({ item }) => (
            <PhotoItem
              id={item.id}
              uri={item.uri}
              press={goToPhoto}
              select={toggleSelected}
              unselect={cancelSelection}
              layout={layout}
              photoWidth={item.width}
              photoHeight={item.height}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  Main: {
    flex: 1,
  },
  Navigation: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  Gallery: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
});
