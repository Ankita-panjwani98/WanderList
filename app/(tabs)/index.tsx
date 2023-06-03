import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import ItemMarker from "../../components/Marker";
// import { geocodeAsync } from "expo-location";

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
    latLong: { latitude: 42.9877866, longitude: -81.2459254 },
    location: "London, Canada",
    title: "Spring Bank Park",
    visited: true,
  },
  {
    latLong: { latitude: 43.6516053, longitude: -79.3831254 },
    location: "Toronto",
    title: "CN Tower",
    visited: false,
  },
  {
    latLong: { latitude: 38.577, longitude: -121.4949 },
    location: "California",
    title: "Golden Gate Bridge",
    visited: false,
  },
  {
    latLong: { latitude: 43.096067, longitude: -79.055462 },
    location: "Niagara Falls",
    title: "Niagara Falls",
    visited: true,
  },
  {
    latLong: { latitude: 45.4200146, longitude: -75.6895387 },
    location: "Ottawa",
    title: "Canadian War Museum",
    visited: false,
  },
];

export default function TabOneScreen() {
  // NOTE: To get geocode from a location, do following:
  // const geoCodedLocation = await geocodeAsync(placeAddress);
  // return geoCodedLocation[0];

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
        {demoWanderList.map((item, index) => (
          <ItemMarker key={item.title} item={item} index={index} />
        ))}
      </MapView>
    </View>
  );
}
