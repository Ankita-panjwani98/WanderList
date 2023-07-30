import { useState, useEffect, useMemo } from "react";
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

const sortOptions = [
  { label: "Created", value: "createdOn" },
  { label: "Priority", value: "priority" },
  { label: "Rating", value: "rating" },
  { label: "Distance", value: "distance" },
];

const filterOptions = [
  { label: "Favourites", value: "favourite" },
  { label: "Visited", value: "visited" },
  { label: "Unvisited", value: "unvisited" },
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
  },

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
  const { bucketList, settings } = useDataContext();

  const router = useRouter();

  const tagList = useMemo(
    () => [
      ...new Set(
        bucketList.items.map(({ tag }) => tag?.toLowerCase()).filter(Boolean)
      ),
    ],
    [bucketList.items]
  );

  const tagOptions = useMemo(
    () =>
      tagList.map((tag) => ({
        label: tag,
        value: tag,
      })),
    [tagList]
  );

  const [sortBy, setSortBy] = useState<string>(sortOptions[0].value);
  const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(
    null
  );

  const [filterBy, setFilterBy] = useState<
    "favourite" | "visited" | "unvisited" | (typeof tagList)[number] | undefined
  >();

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

  const updateFilterBy = (value: string) => {
    if (value === filterBy) setFilterBy(undefined);
    else setFilterBy(value);
  };

  const filteredItems = useMemo(() => {
    const items = bucketList.items.slice();

    if (!filterBy || filterBy === "none") return items;

    switch (filterBy) {
      case "favourite":
        return items.filter(({ favourite }) => favourite);
      case "visited":
        return items.filter(({ hasVisited }) => hasVisited);
      case "unvisited":
        return items.filter(({ hasVisited }) => !hasVisited);
      default: // Is one of Tags
        return items.filter(({ tag }) => tag === filterBy);
    }
  }, [bucketList.items, filterBy]);

  const sortedItems = filteredItems.sort((a, b) => {
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

  const tagFilterValue = () => {
    if (!filterBy) return "none";
    return tagList.some((t) => t === filterBy) ? filterBy : "none";
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: settings.isDarkModeOn ? "#3c5063" : "#f2f3f5",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          margin: 10,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: settings.isDarkModeOn ? "white" : "#222" }}>
          Sort By |{" "}
        </Text>
        <RadioButton
          options={sortOptions}
          selectedOption={sortBy}
          onSelect={setSortBy}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          marginHorizontal: 10,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: settings.isDarkModeOn ? "white" : "#222" }}>
          Filter By |{" "}
        </Text>

        <RNPickerSelect
          onValueChange={(value) => setFilterBy(value)}
          items={[
            { value: "none", label: "Tag" },
            ...(tagOptions as { label: string; value: string }[]),
          ]}
          value={tagFilterValue()}
          disabled={tagOptions.length === 0}
          style={{
            viewContainer: {
              borderWidth: 0.5,
              // eslint-disable-next-line no-nested-ternary
              borderColor: settings.isDarkModeOn
                ? tagFilterValue() !== "none"
                  ? "#e3b836"
                  : "white"
                : tagFilterValue() !== "none"
                ? "green"
                : "grey",
              borderStyle: "dotted",
              margin: 10,
              padding: 5,
              borderRadius: 10,
            },
            inputAndroid: {
              // eslint-disable-next-line no-nested-ternary
              color: settings.isDarkModeOn
                ? tagFilterValue() !== "none"
                  ? "#e3b836"
                  : "white"
                : tagFilterValue() !== "none"
                ? "green"
                : "grey",
            },
            inputIOS: {
              // eslint-disable-next-line no-nested-ternary
              color: settings.isDarkModeOn
                ? tagFilterValue() !== "none"
                  ? "#e3b836"
                  : "white"
                : tagFilterValue() !== "none"
                ? "green"
                : "grey",
            },
          }}
        />

        {filterOptions.map((filter) => (
          <TouchableOpacity
            key={filter.value}
            onPress={() => updateFilterBy(filter.value)}
            style={{
              borderWidth: 0.5,
              // eslint-disable-next-line no-nested-ternary
              borderColor: settings.isDarkModeOn
                ? filter.value === filterBy
                  ? "#e3b836"
                  : "white"
                : filter.value === filterBy
                ? "green"
                : "grey",
              margin: 10,
              padding: 5,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                // eslint-disable-next-line no-nested-ternary
                color: settings.isDarkModeOn
                  ? filter.value === filterBy
                    ? "#e3b836"
                    : "white"
                  : filter.value === filterBy
                  ? "green"
                  : "grey",
              }}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ borderColor: "lightgrey", borderBottomWidth: 0.5 }} />

      {sortedItems?.length > 0 ? (
        <ScrollView style={styles.container}>
          {sortedItems.map((item: Item) => (
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

      {bucketList.items.length === 0 ? (
        <View style={styles.emptyListView}>
          <Text style={{ color: "grey" }}>
            Add a new item by pressing the + icon on bottom right
          </Text>
        </View>
      ) : null}

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
