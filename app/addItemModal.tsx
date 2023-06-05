import { useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { geocodeAsync } from "expo-location";
import { useRouter } from "expo-router";
import generateUUID from "../utils/generateUUID";
import useDataContext from "../context/DataContext";
import Item from "../DB/Item";
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
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  addButton: {
    flex: 1,
    backgroundColor: "#57ad45",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#d44e4e",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default function AddNewItemModalScreen() {
  const { bucketList, setBucketList } = useDataContext();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");

  const resetInputs = () => {
    setTitle("");
    setAddress("");
  };

  const handleAddItem = () => {
    geocodeAsync(address).then(([coordinates]) => {
      const newItem = new Item({
        id: generateUUID(),
        title,
        address,
        coordinates,
        createdOn: Date.now(),
      });
      const newBucketList = new BucketList(bucketList.items.concat(newItem));
      setBucketList(newBucketList);
      router.push("listTab");
    });
  };

  const handleCancel = () => {
    resetInputs();
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add your dream place</Text>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
