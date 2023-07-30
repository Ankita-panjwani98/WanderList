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
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import BucketListItem from "../../components/BucketListItem";
import useDataContext from "../../context/DataContext";
import Item from "../../DB/Item";
import RadioButton from "../../components/RadioButton";
import getCurrentPositionAsync from "../../utils/getCurrentPositionAsync";
import getDistanceBetweenPoints from "../../utils/getDistanceBetweenPoints";

const options = [
  { label: "Created", value: "createdOn" },
  { label: "Priority", value: "priority" },
  { label: "Rating", value: "rating" },
  { label: "Distance", value: "distance" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyListView: {
    paddingTop: "20%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f3f5",
  },
  emptyListViewDarkMode: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3c5063",
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
  addButtonContainerDarkMode: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#e3b836",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,

   toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  toggleText: {
    color: "#222",
    marginRight: 5,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  pickerText: {
    color: "#222",
    marginRight: 5,
  },
});

export default function ListTab() {
  const { bucketList, settings, userTags} = useDataContext();
        
  const [sortBy, setSortBy] = useState<string>(options[0].value);
  const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(
    null
  );
  const [selectedTag, setSelectedTag] = useState<string>("");

  const router = useRouter();

  const handleEditItem = (i: Item) => {
    router.push({ pathname: "/itemModal", params: { itemId: i.id } });
  };

  const handleAddItem = () => {
    router.push({ pathname: "/itemModal" });
  };

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      const location = await getCurrentPositionAsync();
      setCurrentLocation(location);
    };

    fetchCurrentLocation();
  }, []);

  const allTags = bucketList.items
    .map((item) => item.tag?.toLowerCase())
    .filter(Boolean);

  const uniqueTags = Array.from(new Set(allTags));

  const categorizedItems: { [key: string]: Item[] } = bucketList.items.reduce(
    (result: { [key: string]: Item[] }, item: Item) => {
      const tagName = item.tag?.toLowerCase() ?? "uncategorized";
      // Create a copy of result
      const updatedResult = { ...result };
      if (!updatedResult[tagName]) {
        updatedResult[tagName] = [];
      }
      // Modify the copy
      updatedResult[tagName].push(item);
      return updatedResult;
    },
    {}
  );

  const tagOptions = uniqueTags.map((tag: string) => ({
    label: tag,
    value: tag,
  }));

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
  };

  const sortedItems = selectedTag
    ? categorizedItems[selectedTag]?.slice().sort((a, b) => {
        switch (sortBy) {
          case "priority":
            return (a.priority ?? 0) - (b.priority ?? 0);
          case "rating":
            return (b.rating ?? 0) - (a.rating ?? 0);
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
          default:
            return b.createdOn - a.createdOn;
        }
      })
    : bucketList.items.slice().sort((a, b) => {
        switch (sortBy) {
          case "priority":
            return (a.priority ?? 0) - (b.priority ?? 0);
          case "rating":
            return (b.rating ?? 0) - (a.rating ?? 0);
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
          default:
            return b.createdOn - a.createdOn;
        }
      });

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: settings.isDarkModeOn ? "#3c5063" : "#f2f3f5" }}>
      <View
        style={{ flexDirection: "row", justifyContent: "center", margin: 10 }}
      >
        <Text style={{ color: settings.isDarkModeOn ? "white" : "#222" }}>Sort By | </Text>
        <RadioButton
          options={options}
          selectedOption={sortBy}
          onSelect={setSortBy}
        />
      </View>
      <View
        style={{ flexDirection: "row", justifyContent: "center", margin: 10 }}
      >
        <Text style={{ color: "#222" }}>Categorize By | </Text>
        {tagOptions.length > 0 && (
          <RNPickerSelect
            onValueChange={handleTagSelect}
            items={[
              { label: "Select Tag", value: "" }, // Use an empty string as the value
              ...tagOptions,
            ]}
            value={selectedTag}
            style={{ inputAndroid: { color: "black" } }}
          />
        )}
      </View>
      {sortedItems?.length > 0 ? (
        <ScrollView style={styles.container}>
          {sortedItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleEditItem(item)}
            >
              <BucketListItem item={item} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View
          style={
            settings.isDarkModeOn
              ? styles.emptyListViewDarkMode
              : styles.emptyListView
          }
        >
          <Text style={{ color: settings.isDarkModeOn ? "white" : "grey" }}>
            Add a new item by pressing the + icon on bottom right
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={
          settings.isDarkModeOn
            ? styles.addButtonContainerDarkMode
            : styles.addButtonContainer
        }
        onPress={handleAddItem}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
