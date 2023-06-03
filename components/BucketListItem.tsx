import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import BucketList from "../DB/BucketList";
import Item from "../DB/Item";
import useBucketListContext from "../context/DataContext";

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

export default function BucketListItem({ item }: { item: Item }) {
  const { bucketList, setBucketList } = useBucketListContext();

  const router = useRouter();

  const handleEditItem = (i: Item) => {
    router.push({ pathname: "/editItemModal", params: { itemId: i.id } });
  };

  const handleDeleteItem = (i: Item) => {
    const updatedList = bucketList.items.filter((x) => x.id !== i.id);
    setBucketList(new BucketList(updatedList));
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.location}>{item.address}</Text>
      <Text style={styles.visited}>
        {item.hasVisited ? "Visited" : "Not Visited"}
      </Text>

      {/* Display additional fields
      {item.description && <Text>Description: {item.description}</Text>}
      {item.rating && <Text>Rating: {item.rating}/5</Text>}
      {item.priority && <Text>Priority: {item.priority}/3</Text>}
      {item.tag && <Text>Tag: {item.tag}</Text>}
      {item.favourite && <Text>Favourite: Yes</Text>}
      */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditItem(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteItem(item)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
