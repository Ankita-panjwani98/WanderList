import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LocationObject } from "expo-location";
import BucketListItem from "../../components/BucketListItem";
import useDataContext from "../../context/DataContext";
import Item from "../../DB/Item";
import RadioButton from "../../components/RadioButton";
import getCurrentPositionAsync from "../../utils/getCurrentPositionAsync";
import getDistanceBetweenPoints from "../../utils/getDistanceBetweenPoints";

const options = [
  { label: "Priority", value: "priority" },
  { label: "Rating", value: "rating" },
  { label: "Distance", value: "distance" },
  // { label: "Times Visited", value: "visited" },
  { label: "None", value: null },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyListView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#3cb371",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});

export default function ListTab() {
  const { bucketList } = useDataContext();
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(
    null
  );
  const router = useRouter();

  const handleEditItem = (i: Item) => {
    router.push({ pathname: "/editItemModal", params: { itemId: i.id } });
  };

  const handleAddItem = () => {
    router.push({ pathname: "/addItemModal" });
  };

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      const location = await getCurrentPositionAsync();
      setCurrentLocation(location);
    };

    fetchCurrentLocation();
  }, []);

  const sortedItems = bucketList.items.slice().sort((a, b) => {
    switch (sortBy) {
      case "priority":
        return (a.priority ?? 0) - (b.priority ?? 0);
      case "rating":
        return (a.rating ?? 0) - (b.rating ?? 0);
      case "distance":
        if (currentLocation) {
          const distance1 = getDistanceBetweenPoints(
            currentLocation.coords,
            a.coordinates
          );
          const distance2 = getDistanceBetweenPoints(
            currentLocation.coords,
            b.coordinates
          );
          return distance1 - distance2;
        }
        return 0;
      // case "visited":
      //   return 0;
      default:
        return a.createdOn - b.createdOn;
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: 10 }}>Sort By:</Text>
        </View>
        <View>
          <RadioButton
            options={options}
            selectedOption={sortBy}
            onSelect={setSortBy}
          />
        </View>
        {sortedItems.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleEditItem(item)}>
            <BucketListItem item={item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButtonContainer}
        onPress={handleAddItem}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
