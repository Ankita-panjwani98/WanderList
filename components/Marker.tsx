import { Marker } from "react-native-maps";
import { Image } from "react-native";
import Item from "../DB/Item";

/* eslint-disable @typescript-eslint/no-var-requires */
const iconGreen = require("../assets/images/icon-green.png");
const iconGrey = require("../assets/images/icon-grey.png");
const iconYellow = require("../assets/images/icon-gold.png");
const iconBlue = require("../assets/images/icon-blue.png");

export default function ItemMarker({ item }: { item: Item }) {
  let source = iconGrey;
  /* eslint-disable no-lonely-if */
  if (item.favourite) {
    if (item.hasVisited) source = iconBlue;
    else source = iconYellow;
  } else {
    if (item.hasVisited) source = iconGreen;
    else source = iconGrey;
  }

  return (
    <Marker
      key={item.title}
      coordinate={item.coordinates}
      pinColor="green"
      title={item.title}
      description={item.address}
    >
      <Image source={source} style={{ height: 50, width: 50 }} />
    </Marker>
  );
}
