import { Marker } from "react-native-maps";
import Item from "../DB/Item";
// import { Callout, Marker } from "react-native-maps";
// import { Image, Text, View } from "react-native";

export default function ItemMarker({ item }: { item: Item }) {
  return (
    <Marker
      key={item.title}
      coordinate={item.coordinates}
      pinColor="green"
      description={item.title}
    >
      {
        // <Callout
        //   style={{
        //     width: 200,
        //     height: 60,
        //     display: "flex",
        //     flexDirection: "row",
        //     justifyContent: "space-between",
        //     alignItems: "center",
        //   }}
        // >
        //   <View style={{ width: 0, flexGrow: 1, flex: 1 }}>
        //     <Text style={{ fontSize: 16, color: "#b51b6d", fontWeight: "bold" }}>
        //       {item.title}
        //     </Text>
        //     <Text style={{ fontSize: 14, color: "#751b4b" }}>
        //       {item.location}
        //     </Text>
        //   </View>
        //
        //   <Image
        //     source={require("../assets/images/ottawa.jpeg")}
        //     style={{
        //       width: 60,
        //       height: 50,
        //     }}
        //   />
        // </Callout>
        // <Image
        //   source={require("../assets/images/mapmarker.png")}
        //   style={{
        //     width: 30,
        //     height: 30,
        //   }}
        // />
      }
    </Marker>
  );
}
