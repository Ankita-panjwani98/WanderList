import { StyleSheet, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import ItemMarker from "../../components/Marker";
import useDataContext from "../../context/DataContext";
import getDistanceBetweenPoints from "../../utils/getDistanceBetweenPoints";
import BucketList from "../../DB/BucketList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  errorText: {
    textAlign: "center",
    margin: 10,
    color: "red",
  },
});

const DEFAULT_REGION_LONDON = {
  latitude: 42.9877866,
  longitude: -81.2459254,
  latitudeDelta: 8,
  longitudeDelta: 8,
};

export default function MapTab() {
  const { bucketList, setBucketList, settings } = useDataContext();
  const [error, setError] = useState("");
  const [currentLatLng, setCurrentLatLng] = useState<Region>();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission not granted!!");
        return;
      }

      // NOTE: See if map automatically follows user location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentLatLng({
        latitude,
        longitude,
        latitudeDelta: 8,
        longitudeDelta: 8,
      });
    })();
  }, []);

  useEffect(() => {
    if (!currentLatLng) return;

    if (!settings.visitedDistanceThreshold) return;

    const newItems = bucketList.items.map((item) => {
      const newItem = { ...item };

      const distance = getDistanceBetweenPoints(
        item.coordinates,
        currentLatLng
      );

      if (distance < settings.visitedDistanceThreshold) {
        newItem.hasVisited = true;
      }

      return newItem;
    });

    setBucketList(new BucketList(newItems));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLatLng]);

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.errorText}>{error}</Text> : ""}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={currentLatLng || DEFAULT_REGION_LONDON}
        showsIndoors={false}
        followsUserLocation
      >
        {bucketList.items.map((item) => (
          <ItemMarker key={item.id} item={item} />
        ))}
      </MapView>
    </View>
  );
}
