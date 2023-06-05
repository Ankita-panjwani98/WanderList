import {
  StyleSheet,
  Text,
  ScrollView,
  Button,
  View,
  Alert,
} from "react-native";
import BucketListItem from "../../components/BucketListItem";
import useDataContext from "../../context/DataContext";
import BucketList from "../../DB/BucketList";

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
});

export default function ListTab() {
  const { bucketList, setBucketList } = useDataContext();

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
        <BucketListItem key={item.id} item={item} />
      ))}
      <Button title="Clear List" onPress={handleClearList} />
    </ScrollView>
  ) : (
    <View style={styles.emptyListView}>
      <Text style={{ color: "grey" }}>
        Add a new item by pressing the + icon on top right
      </Text>
    </View>
  );
}
