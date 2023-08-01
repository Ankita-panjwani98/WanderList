import { Marker } from "react-native-maps";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import Item from "../DB/Item";
import getIconForItem from "../utils/getIconForItem";

export default function ItemMarker({ item }: { item: Item }) {
  const router = useRouter();

  return (
    <Marker
      key={item.title}
      coordinate={item.coordinates}
      title={item.title}
      description={item.description}
      onCalloutPress={() =>
        router.push({ pathname: "/itemModal", params: { itemId: item.id } })
      }
    >
      <Image source={getIconForItem(item)} style={{ height: 40, width: 40 }} />
    </Marker>
  );
}
