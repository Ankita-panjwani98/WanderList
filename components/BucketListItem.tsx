import { View, Text, StyleSheet, Image } from "react-native";
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "75%",
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
});

export default function BucketListItem({ item }: { item: Item }) {
  const { settings } = useDataContext();

  return (
    <View
      style={
        settings.isDarkModeOn ? styles.itemContainerDark : styles.itemContainer
      }
    >
      <View style={styles.itemSubContainer}>
        <View style={styles.itemDetailsContainer}>
          <Image
            source={getIconForItem(item)}
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
          <View>
            <Text
              style={settings.isDarkModeOn ? styles.titleDark : styles.title}
            >
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
        </View>
      </View>
      {/* Display additional fields
      {item.description && <Text>Description: {item.description}</Text>}
      {item.rating && <Text>Rating: {item.rating}/5</Text>}
      {item.priority && <Text>Priority: {item.priority}/3</Text>}
      {item.tag && <Text>Tag: {item.tag}</Text>}
      {item.favourite && <Text>Favourite: Yes</Text>}
      */}
    </View>
  );
}
