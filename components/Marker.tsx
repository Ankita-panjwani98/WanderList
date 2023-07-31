import { Marker } from "react-native-maps";
import { Image } from "react-native";
import Item from "../DB/Item";
import getIconForItem from "../utils/getIconForItem";

export default function ItemMarker({ item }: { item: Item }) {
  return (
    <Marker
      key={item.title}
      coordinate={item.coordinates}
      pinColor="green"
      title={item.title}
      description={item.description}
    >
      <Image source={getIconForItem(item)} style={{ height: 40, width: 40 }} />
    </Marker>
  );
}
