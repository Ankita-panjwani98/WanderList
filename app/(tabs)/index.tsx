import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
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

export default function MapTab() {
  const { bucketList } = useDataContext();

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
        {bucketList.items.map((item) => (
          <ItemMarker key={item.id} item={item} />
        ))}
      </MapView>
    </View>
  );
}
