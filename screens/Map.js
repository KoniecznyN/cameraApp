import { StyleSheet, Text, View } from "react-native";
import { React, useEffect, useState } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { Marker } from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("my-key");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log(e);
  }
};

const Map = () => {
  const [data, setData] = useState([]);
  const [loading, toggleLoading] = useState(true);

  const fetchData = async () => {
    let data = await getData();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data != undefined) {
      toggleLoading(false);
    }
  }, [data]);

  return loading ? (
    <View>
      <Text>Ładuje się</Text>
    </View>
  ) : (
    <GestureHandlerRootView>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: data[0]?.localization.latitude,
          longitude: data[0]?.localization.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      ></MapView>
    </GestureHandlerRootView>
  );
};

export default Map;

const styles = StyleSheet.create({});
