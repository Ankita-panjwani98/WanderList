import { View, StyleSheet } from "react-native";
import BucketListItem from "../../components/BucketListItem";
import useBucketListContext from "../../context/DataContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
  },
});

export default function ListTab() {
  const { bucketList } = useBucketListContext();

  return (
    <View style={styles.container}>
      {bucketList.items.map((item) => (
        <BucketListItem key={item.id} item={item} />
      ))}
    </View>
  );
}
