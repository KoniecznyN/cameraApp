import { BackHandler, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CameraButton from "../components/CameraButton";
import RadioGroup from "../components/RadioGroup";

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

const Camera = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");
  const [cameraReady, setCameraReady] = useState(false);
  const [bottomSheet, toggleBottomSheet] = useState(true);
  const cameraRef = useRef(null);
  const bottomSheetRef = useRef(null);

  const [localizationData, setLocalizationData] = useState();
  const [loadingLocation, setLoadingLocation] = useState(true);

  const [currentRatio, setCurrentRatio] = useState("4:3");
  const [pictureSize, setPictureSize] = useState("600x800");
  const [sizes, getPictureSizes] = useState([]);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    const prepare = async () => {
      if (!permission) {
        await requestPermission();
      }

      if (permission?.granted) {
        setCameraReady(true);
        await fetchSizes();
        await getCurrentLocation();
      }
    };

    prepare();
  }, [permission]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.replace("gallery");
        return true;
      }
    );

    return () => backHandler.remove();
  });

  const getSizes = async () => {
    if (cameraRef) {
      return await cameraRef.current.getAvailablePictureSizesAsync(
        currentRatio
      );
    }
  };

  const getCurrentLocation = async () => {
    setLoadingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      });

      console.log("Lokalizacja pobrana:", location.coords);
      setLocalizationData(location.coords);
    } catch (error) {
      console.log("Błąd pobierania lokalizacji:", error);
    } finally {
      setLoadingLocation(false);
    }
  };

  const fetchSizes = async () => {
    const sizes = await getSizes();
    getPictureSizes(sizes);
  };

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const flipCamera = (e) => {
    setFacing((e) => (e === "back" ? "front" : "back"));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      await MediaLibrary.createAssetAsync(photo.uri);

      let photoTemp = { ...photo, localization: localizationData };

      let data = await getData();
      data = [...data, photoTemp];

      await storeData(data);

      console.log("Updated stored data:", data);
    }
  };

  const expandBottomSheet = () => {
    if (bottomSheet) {
      bottomSheetRef.current?.expand();
      toggleBottomSheet(false);
    } else {
      bottomSheetRef.current?.close();
      toggleBottomSheet(true);
    }
  };

  const handleTorchChange = (value) => {
    setTorchEnabled(value === "Torch On");
  };

  const goToMap = () => {
    navigation.replace("map", Location.data);
  };

  if (!permission) {
    return (
      <View>
        <Text>Permissions not present</Text>
      </View>
    );
  }

  return (
    <View style={styles.Camera}>
      <GestureHandlerRootView>
        <CameraView
          style={styles.Camera}
          ref={cameraRef}
          facing={facing}
          ratio={currentRatio}
          pictureSize={pictureSize}
          enableTorch={torchEnabled}
          zoom={zoom}
        >
          <View>
            <CameraButton size={1} func={goToMap} type={"map"}></CameraButton>
          </View>
          <View style={styles.Buttons}>
            <CameraButton size={1} func={expandBottomSheet} type="settings" />
            {loadingLocation ? (
              <Text style={{ color: "white" }}>Ładowanie lokalizacji...</Text>
            ) : (
              <CameraButton size={2} func={takePhoto} type="take" />
            )}
            <CameraButton size={1} func={flipCamera} type="reverse" />
          </View>
        </CameraView>
        <BottomSheet
          style={{ flex: 1 }}
          ref={bottomSheetRef}
          index={-1}
          snapPoints={["3%", "50%", "75%"]}
          onChange={handleSheetChanges}
          backgroundStyle={{ backgroundColor: "#222222" }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <BottomSheetView>
              <RadioGroup
                color="darkred"
                columns={2}
                change={handleTorchChange}
                data={["Torch Off", "Torch On"]}
                groupName="TORCH MODE"
              />
              <RadioGroup
                color="darkred"
                columns={5}
                change={setZoom}
                data={[0, 0.5, 1, 1.5, 2]}
                groupName="CAMERA ZOOM"
              />
              <RadioGroup
                color="darkred"
                columns={3}
                change={setCurrentRatio}
                data={["4:3", "16:9", "1:1"]}
                groupName="CAMERA RATIO"
              />
              <RadioGroup
                color="darkred"
                columns={2}
                change={setPictureSize}
                data={sizes}
                groupName="PICTURE SIZE"
              />
            </BottomSheetView>
          </ScrollView>
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  Camera: { flex: 1 },
  Buttons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
  },
});
