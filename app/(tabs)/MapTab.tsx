import { StyleSheet, View, Alert } from "react-native";
import MapView, { MapStyleElement, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useRef } from "react";
import ItemMarker from "../../components/Marker";
import useDataContext from "../../context/DataContext";
import "react-native-gesture-handler";
import requestLocationPermission from "../../utils/requestLocationPermission";
import getCurrentPositionAsync from "../../utils/getCurrentPositionAsync";
import BucketList from "../../DB/BucketList";
import getDistanceBetweenPoints from "../../utils/getDistanceBetweenPoints";

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
    // background: "blue",
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
  const mapRef = useRef<MapView | null>(null);
  const visitedTimer = useRef<NodeJS.Timeout>();

  const darkModeCustomMapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#3c5063",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#f2eded",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#3c5063",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#f2eded",
        },
      ],
    },
  ];

  const lightModeStyle: MapStyleElement[] | undefined = [];

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
  }, [bucketList]);

  const updateVisited = async () => {
    const currentLocation = await getCurrentPositionAsync();
    if (!currentLocation) return;

    const newBucketList = new BucketList([]);
    let hasUpdated = false;

    bucketList.items.forEach((item) => {
      if (item.hasVisited) {
        newBucketList.items.push(item);
        return;
      }

      const distance = getDistanceBetweenPoints(
        item.coordinates,
        currentLocation.coords
      );

      if (distance * 1000 < settings.visitedDistanceThreshold) {
        const newItem = { ...item };
        newItem.hasVisited = true;
        newItem.updatedOn = Date.now();
        newBucketList.items.push(newItem);
        hasUpdated = true;
        Alert.alert(
          `Welcome to ${item.title}`,
          `Marking ${item.address} as visited!`
        );
      } else {
        newBucketList.items.push(item);
      }
    });

    if (hasUpdated) setBucketList(newBucketList);
  };

  useEffect(() => {
    if (visitedTimer.current) clearInterval(visitedTimer.current);
    if (settings.visitedDistanceThreshold && bucketList.items.length) {
      visitedTimer.current = setInterval(updateVisited, 5000);
    }
    return () => {
      clearInterval(visitedTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucketList, settings]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={
          settings.isDarkModeOn ? darkModeCustomMapStyle : lightModeStyle
        }
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
