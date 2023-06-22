import { StyleSheet, View, Text, Alert } from "react-native";
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

const requestLocationPermission = async (): Promise<boolean> => {
  if (Location.PermissionStatus.GRANTED) return true;
  if (Location.PermissionStatus.DENIED) return false;
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === Location.PermissionStatus.GRANTED;
};

export default function MapTab() {
  const { bucketList, setBucketList, settings } = useDataContext();
  const [currentLatLng, setCurrentLatLng] = useState<Region>();

  const updateLocation = async () => {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.Low,
    });

    setCurrentLatLng({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 8,
      longitudeDelta: 8,
    });
  };

  useEffect(() => {
    requestLocationPermission().then((hasPermission) => {
      if (hasPermission) updateLocation();
      else {
        Alert.alert(
          "Location permission denied.",
          "Some features may not work correctly!"
        );
      }
    });
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
        if (!newItem.hasVisited) {
          newItem.hasVisited = true;
          Alert.alert(
            `Welcome to ${item.title}`,
            `Marking ${item.address} as visited!`
          );
        }
      }

      return newItem;
    });

    setBucketList(new BucketList(newItems));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLatLng]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={currentLatLng || DEFAULT_REGION_LONDON}
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
