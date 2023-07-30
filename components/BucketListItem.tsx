import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Item from "../DB/Item";
import useDataContext from "../context/DataContext";
import getIconForItem from "../utils/getIconForItem";
import CustomRating from "../components/CustomRating";

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
    flexDirection: "row", // Display the main content in a row
    alignItems: "flex-start", // Align items to the top of the container
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
  // Add a new style for the container holding rating and priority icons
  topRightContainer: {
    alignItems: "flex-end", // Align the icons to the right
  },
});

export default function BucketListItem({ item }: { item: Item }) {
  const { settings } = useDataContext();
  // Ensure that item.rating and item.priority are within the range of {0, 1, 2, 3, 4, 5}
  const rating =
    item.rating !== undefined ? Math.max(0, Math.min(item.rating, 5)) : 0;
  const priority =
    item.priority !== undefined ? Math.max(0, Math.min(item.priority, 3)) : 0;

  const handleRatingChange = (newRating: number) => {
    // Implement any logic related to handling the rating change here
    console.log("New rating:", newRating);
  };

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
          {/* Rating and priority icons */}
          <View style={styles.topRightContainer}>
            {item.favourite && (
              <View style={styles.favouriteContainer}>
                <FontAwesome name="star" size={20} color="orange" />
              </View>
            )}
            <View style={styles.ratingContainer}>
              <CustomRating
                type="heart"
                handleRatingChange={handleRatingChange} // Update the handleRatingChange function
                label=""
                ratingCount={5}
                startingValue={rating as 0 | 1 | 2 | 3 | 4 | 5 | undefined}
                imageSize={18}
              />
            </View>
            <View style={styles.ratingContainer}>
              <CustomRating
                type="bell"
                handleRatingChange={handleRatingChange} // Update the handleRatingChange function
                label=""
                ratingCount={3}
                startingValue={priority as 0 | 1 | 2 | 3 | undefined}
                imageSize={18}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
