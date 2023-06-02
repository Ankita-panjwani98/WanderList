import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MarkerMap from "../Marker/MarkerMap";

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
});
type Item = {
  title: string;
  location: string;
  visited: boolean;
  latLong?: { latitude: number; longitude: number };
};

const demoWanderList: Item[] = [
  {
    title: "Spring Bank Park",
    location: "London, Canada",
    visited: true,
  },
  {
    title: "CN Tower",
    location: "Toronto",
    visited: false,
  },
  {
    title: "Golden Gate Bridge",
    location: "California",
    visited: false,
  },
  {
    title: "Niagara Falls",
    location: "Niagara Falls",
    visited: true,
  },
  {
    title: "Canadian War Museum",
    location: "Ottawa",
    visited: false,
  },
];

export default function TabOneScreen() {
  const [wanderList, setWanderlist] = useState(demoWanderList);

  const geoCode = async (placeAddress: string) => {
    const geoCodedLocation = await Location.geocodeAsync(placeAddress);
    return geoCodedLocation[0];
  };

  const updatedBucketList = async () => {
    const updatedArray = await Promise.all(
      wanderList.map(async (item) => {
        const geocodedLocation = await geoCode(item.location);
        return {
          ...item,
          latLong: {
            latitude: geocodedLocation.latitude,
            longitude: geocodedLocation.longitude,
          },
        };
      })
    );

    setWanderlist(updatedArray);
  };

  useEffect(() => {
    updatedBucketList();
  }, []);

  const INITIAL_POSITION = {
    latitude: 42.9877866,
    longitude: -81.2459254,
    latitudeDelta: 8,
    longitudeDelta: 8,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {wanderList.map((item, index) => {
          return <MarkerMap key={index} item={item} index={index} />;
        })}
      </MapView>
    </View>
  );
}
