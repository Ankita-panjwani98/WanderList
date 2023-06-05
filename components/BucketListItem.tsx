import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import BucketList from "../DB/BucketList";
import Item from "../DB/Item";
import useDataContext from "../context/DataContext";

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
  itemSubContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    maxWidth: "75%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6a6b67",
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 4,
  },
  visited: {
    fontSize: 14,
    paddingRight: 10,
    color: "#666666",
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

  clearButton: {
    marginVertical: 10,
    alignSelf: "center",
  },
});

export default function BucketListItem({ item }: { item: Item }) {
  const { bucketList, setBucketList } = useDataContext();

  const router = useRouter();

  const handleEditItem = (i: Item) => {
    router.push({ pathname: "/editItemModal", params: { itemId: i.id } });
  };

  const handleDeleteItem = (i: Item) => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete ${i.title} item?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedList = bucketList.items.filter((x) => x.id !== i.id);
            setBucketList(new BucketList(updatedList));
          },
        },
      ]
    );
  };

  const handleClearList = () => {
    setBucketList(new BucketList([]));
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemSubContainer}>
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.location}>{item.address}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditItem(item)}
          >
            <FontAwesome
              size={30}
              style={{ marginBottom: -3 }}
              name="pencil"
              color="#6D9C3F"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteItem(item)}
          >
            <FontAwesome
              size={30}
              style={{ marginBottom: -3 }}
              name="trash"
              color="#db5c40"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Display additional fields
      {item.description && <Text>Description: {item.description}</Text>}
      {item.rating && <Text>Rating: {item.rating}/5</Text>}
      {item.priority && <Text>Priority: {item.priority}/3</Text>}
      {item.tag && <Text>Tag: {item.tag}</Text>}
      {item.favourite && <Text>Favourite: Yes</Text>}
      */}

      <Button
        title="Clear List"
        onPress={handleClearList}
        style={styles.clearButton}
      />
    </View>
  );
}
