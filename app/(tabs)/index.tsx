import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import BucketListItem from "../../components/BucketListItem";
import useDataContext from "../../context/DataContext";
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
  const { bucketList } = useDataContext();
  const router = useRouter();

  const handleEditItem = (i: Item) => {
    router.push({ pathname: "/editItemModal", params: { itemId: i.id } });
  };

  return bucketList.items.length > 0 ? (
    <ScrollView style={styles.container}>
      {bucketList.items.map((item) => (
        <TouchableOpacity key={item.id} onPress={() => handleEditItem(item)}>
          <BucketListItem item={item} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  ) : (
    <View style={styles.emptyListView}>
      <Text style={{ color: "grey" }}>
        Add a new item by pressing the + icon on top right
      </Text>
    </View>
  );
}
