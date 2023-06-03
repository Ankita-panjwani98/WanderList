import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    marginBottom: 4,
  },
  visited: {
    fontSize: 16,
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default function BucketListItem({ item, onUpdate, onDelete }) {
  const navigation = useNavigation();

  const handleEditItem = () => {
    navigation.navigate("editItemModal", { item, updateItem: onUpdate });
  };

  const handleDeleteItem = () => {
    onDelete(item);
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.location}>{item.address}</Text>
      <Text style={styles.visited}>
        {item.hasVisited ? "Visited" : "Not Visited"}
      </Text>

      {/* Display additional fields */}
      {item.coordinates && (
        <Text>Coordinates: {item.coordinates.join(", ")}</Text>
      )}
      {item.description && <Text>Description: {item.description}</Text>}
      {item.rating && <Text>Rating: {item.rating}/5</Text>}
      {item.priority && <Text>Priority: {item.priority}/3</Text>}
      {item.tag && <Text>Tag: {item.tag}</Text>}
      {item.favourite && <Text>Favourite: Yes</Text>}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditItem}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteItem}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
