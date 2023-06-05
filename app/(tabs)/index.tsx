import { StyleSheet, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import ItemMarker from "../../components/Marker";
import useDataContext from "../../context/DataContext";

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

export default function MapTab() {
  const { bucketList } = useDataContext();
  const [error, setError] = useState("");
  const [latlong, setLatLong] = useState({
    latitude: 42.9877866,
    longitude: -81.2459254,
  });
  useEffect(() => {
    (async () => {
      // Ask for location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission not granted!!");
        return;
      }
      // Access the current user's location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLatLong({
        latitude,
        longitude,
      });
    })();
    setError("");
  }, []);

  // Initial position
  const INITIAL_POSITION = {
    latitude: latlong.latitude,
    longitude: latlong.longitude,
    latitudeDelta: 8,
    longitudeDelta: 8,
  };

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.errorText}>{error}</Text> : ""}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {bucketList.items.map((item) => (
          <ItemMarker key={item.id} item={item} />
        ))}
      </MapView>
    </View>
  );
}
