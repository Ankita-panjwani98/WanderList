import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  ScrollView,
  Button,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import BucketListItem from "../../components/BucketListItem";
import useDataContext from "../../context/DataContext";
import BucketList from "../../DB/BucketList";
import Item from "../../DB/Item";

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
  clearListBtn: {
    backgroundColor: "#3cb371",
    width: "40%",
    borderRadius: 5,
    padding: 8,
    color: "white",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default function ListTab() {
  const { bucketList, setBucketList } = useDataContext();
  const router = useRouter();

  const handleEditItem = (i: Item) => {
    router.push({ pathname: "/editItemModal", params: { itemId: i.id } });
    // router.push({ pathname: "/detailsItemModal", params: { itemId: i.id } });
  };

  const handleClearList = () => {
    Alert.alert(
      "Clear List",
      "Are you sure you want to delete all items from the list?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete All",
          style: "destructive",
          onPress: () => {
            setBucketList(new BucketList([]));
          },
        },
      ]
    );
  };

  return bucketList.items.length > 0 ? (
    <ScrollView style={styles.container}>
      {bucketList.items.map((item) => (
        <TouchableOpacity key={item.id} onPress={() => handleEditItem(item)}>
          <BucketListItem item={item} />
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.clearListBtn} onPress={handleClearList}>
        <Text style={styles.buttonText}>Clear List</Text>
      </TouchableOpacity>
    </ScrollView>
  ) : (
    <View style={styles.emptyListView}>
      <Text style={{ color: "grey" }}>
        Add a new item by pressing the + icon on top right
      </Text>
    </View>
  );
}
