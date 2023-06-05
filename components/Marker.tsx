import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Marker } from "react-native-maps";
import Item from "../DB/Item";

export default function ItemMarker({ item }: { item: Item }) {
  return (
    <Marker
      key={item.title}
      coordinate={item.coordinates}
      pinColor="green"
      title={item.title}
      description={item.address}
    >
      <FontAwesome
        size={35}
        style={{ marginBottom: -3 }}
        name="map-marker"
        color="#f04000"
      />
    </Marker>
  );
}
