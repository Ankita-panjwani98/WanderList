import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import BucketListItem from "../../components/BucketListItem";
import BucketList from "../../DB/BucketList";
import Item from "../../DB/Item";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
  },
});

export default function TabTwoScreen() {
  const [bucketList, setBucketList] = useState(new BucketList([]));

  const route = useRoute();
  const newItem = route.params?.newItem;

  useEffect(() => {
    if (newItem) {
      const item = new Item(newItem);
      setBucketList((prevBucketList) => {
        const updatedBucketList = new BucketList([
          ...prevBucketList.items,
          item,
        ]);
        return updatedBucketList;
      });
    }
  }, [newItem, setBucketList]);

  const updateItem = (updatedItem) => {
    const updatedList = bucketList.items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setBucketList(new BucketList(updatedList));
  };

  const handleDeleteItem = (itemToDelete) => {
    const updatedList = bucketList.items.filter(
      (item) => item.id !== itemToDelete.id
    );
    setBucketList(new BucketList(updatedList));
  };

  return (
    <View style={styles.container}>
      {bucketList.items.map((item) => (
        <BucketListItem
          key={item.id}
          item={item}
          onUpdate={updateItem}
          onDelete={handleDeleteItem}
        />
      ))}
    </View>
  );
}
