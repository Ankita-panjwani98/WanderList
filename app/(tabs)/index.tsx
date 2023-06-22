import { StyleSheet, View, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useRef } from "react";
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

const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === Location.PermissionStatus.GRANTED;
};

export default function MapTab() {
  const { bucketList, setBucketList, settings } = useDataContext();
  const mapRef = useRef<MapView | null>(null);

  // Request permission if not granted for first time when app opened
  // Show alert if denied
  useEffect(() => {
    requestLocationPermission().then((granted) => {
      if (!granted) {
        Alert.alert(
          "Location permission not granted.",
          "Some features may not work correctly!"
        );
      }
    });
  });

  // This function updates mapView to include all items
  useEffect(() => {
    if (!mapRef.current || !bucketList.items.length) return;
    mapRef.current.fitToCoordinates(
      bucketList.items.map((it) => it.coordinates),
      {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      }
    );
  }, [bucketList.items]);

  // The block below automatically marks nearby items visited
  useEffect(() => {
    if (!bucketList.items.length) return;

    (async () => {
      const hasPermission = await requestLocationPermission();

      if (!hasPermission) return;

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.Low,
      });

      const newBucketList = new BucketList([]);
      let hasUpdated = false;

      bucketList.items.forEach((item) => {
        const distance = getDistanceBetweenPoints(
          item.coordinates,
          currentLocation.coords
        );

        if (distance < settings.visitedDistanceThreshold) {
          if (!item.hasVisited) {
            const newItem = { ...item };
            newItem.hasVisited = true;
            newItem.updatedOn = Date.now();
            Alert.alert(
              `Welcome to ${item.title}`,
              `Marking ${item.address} as visited!`
            );
            newBucketList.items.push(newItem);
            hasUpdated = true;
          }
        } else {
          newBucketList.items.push(item);
        }
      });

      if (hasUpdated) setBucketList(newBucketList);
    })();
  }, [bucketList.items, settings.visitedDistanceThreshold, setBucketList]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={DEFAULT_REGION_LONDON}
        showsIndoors={false}
        ref={(r) => {
          mapRef.current = r;
        }}
        showsUserLocation
        followsUserLocation
      >
        {bucketList.items.map((item) => (
          <ItemMarker key={item.id} item={item} />
        ))}
      </MapView>
    </View>
  );
}
