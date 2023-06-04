import { StyleSheet, ScrollView } from "react-native";
import BucketListItem from "../../components/BucketListItem";
import useDataContext from "../../context/DataContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default function ListTab() {
  const { bucketList } = useDataContext();

  return (
    <ScrollView style={styles.container}>
      {bucketList.items.map((item) => (
        <BucketListItem key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}
