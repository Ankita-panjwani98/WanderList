import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import useDataContext from "../context/DataContext";
import BucketList from "../DB/BucketList";

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#57ad45",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    textAlign: "center",
    width: "25%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default function EditItemModal() {
  const { bucketList, setBucketList } = useDataContext();
  const router = useRouter();
  const { itemId } = useLocalSearchParams();

  const item = bucketList.items.find((i) => i.id === itemId);

  const [title, setTitle] = useState(item?.title);
  const [address, setAddress] = useState(item?.address);

  const handleSave = () => {
    // TODO: Check if co-ordinates should be manually updated

    if (!item || !title || !address) return;

    const updatedItem = {
      ...item,
      ...{ title, address, updateOn: Date.now() },
    };

    const updatedList = bucketList.items.map((i) =>
      i.id === updatedItem.id ? updatedItem : i
    );

    setBucketList(new BucketList(updatedList));

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Your Destination</Text>
      <View style={styles.separator} />

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
