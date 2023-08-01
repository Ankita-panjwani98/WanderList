// eslint-disable no-nested-ternary
import { View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Item from "../DB/Item";
import useDataContext from "../context/DataContext";
import getIconForItem from "../utils/getIconForItem";

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  itemContainerDark: {
    marginBottom: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#617287",
    borderRadius: 10,
    padding: 10,
  },
  itemSubContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemDetailsContainer: {
    flex: 1, // Let the details container take all the available width
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6a6b67",
    marginBottom: 4,
  },
  titleDark: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 4,
  },
  locationDark: {
    fontSize: 16,
    color: "white",
    marginBottom: 4,
  },
  visited: {
    fontSize: 14,
    paddingRight: 10,
    color: "#666666",
  },
  visitedDark: {
    fontSize: 14,
    paddingRight: 10,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  editButton: {
    marginHorizontal: 10,
  },
  deleteButton: {
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  favouriteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
});

function SortIcon({
  sort,
  item,
  isDarkModeOn,
}: {
  sort?: string;
  item: Item;
  isDarkModeOn: boolean;
}) {
  if (sort === "createdOn") return null;

  const borderColor =
    sort === "priority"
      ? "orange"
      : sort === "rating"
      ? "red"
      : isDarkModeOn
      ? "lightgrey"
      : "grey";

  return (
    <View
      style={{
        padding: 5,
        borderWidth: 1,
        borderRadius: 500,
        borderColor,
      }}
    >
      {sort === "priority" ? (
        <Text style={{ color: "orange" }}>{item.priority}</Text>
      ) : null}

      {sort === "rating" ? (
        <Text style={{ color: "red" }}>{item.rating}</Text>
      ) : null}

      {sort === "distance" ? (
        <Text style={{ color: isDarkModeOn ? "lightgrey" : "grey" }}>
          {Math.round(item.distance || 0)} km
        </Text>
      ) : null}
    </View>
  );
}

export default function BucketListItem({
  item,
  sort,
}: {
  item: Item;
  sort: string;
}) {
  const { settings } = useDataContext();

  return (
    <View
      style={
        settings.isDarkModeOn ? styles.itemContainerDark : styles.itemContainer
      }
    >
      <View style={styles.itemSubContainer}>
        <Image
          source={getIconForItem(item)}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <View style={styles.itemDetailsContainer}>
          <Text style={settings.isDarkModeOn ? styles.titleDark : styles.title}>
            {item.title}
          </Text>
          <Text
            style={
              settings.isDarkModeOn ? styles.locationDark : styles.location
            }
          >
            {item.address}
          </Text>
        </View>

        <View style={{ margin: 5 }}>
          {item.favourite ? (
            <FontAwesome size={30} name="star" color="orange" />
          ) : null}
        </View>

        <SortIcon
          sort={sort}
          item={item}
          isDarkModeOn={settings.isDarkModeOn}
        />
      </View>
    </View>
  );
}
