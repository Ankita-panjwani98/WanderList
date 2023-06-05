import { StyleSheet, Text, ScrollView, Button, View } from "react-native";
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

  return bucketList.items.length > 0 ? (
    <ScrollView style={styles.container}>
      {bucketList.items.map((item) => (
        <BucketListItem key={item.id} item={item} />
      ))}
      <Button
        title="Clear List"
        onPress={() => setBucketList(new BucketList([]))}
      />
    </ScrollView>
  ) : (
    <View style={styles.emptyListView}>
      <Text style={{ color: "grey" }}>
        Add a new item by pressing the + icon on top right
      </Text>
    </View>
  );
}
