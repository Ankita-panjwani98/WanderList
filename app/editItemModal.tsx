import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  // Switch,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import useBucketListContext from "../context/DataContext";
import BucketList from "../DB/BucketList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
    width: "80%",
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default function EditItemModal() {
  const { bucketList, setBucketList } = useBucketListContext();
  const router = useRouter();
  const { itemId } = useLocalSearchParams();

  const item = bucketList.items.find((i) => i.id === itemId);

  const [title, setTitle] = useState(item?.title);
  const [address, setAddress] = useState(item?.address);
  // const [coordinates, setCoordinates] = useState(item.coordinates || []);
  // const [hasVisited, setHasVisited] = useState(item.hasVisited);
  // const [description, setDescription] = useState(item.description || "");
  // const [rating, setRating] = useState(item.rating || 0);
  // const [priority, setPriority] = useState(item.priority || 0);
  // const [tag, setTag] = useState(item.tag || "");
  // const [favourite, setFavourite] = useState(item.favourite || false);

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
      <Text style={styles.title}>Edit Item</Text>
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

      {
        // <View style={styles.switchContainer}>
        //   <Text>Visited/Opened:</Text>
        //   <Switch value={hasVisited} onValueChange={setHasVisited} />
        // </View>
        //
        // <TextInput
        //   style={styles.input}
        //   value={coordinates.join(", ")}
        //   onChangeText={(text) =>
        //     setCoordinates(text.split(",").map((coord) => Number(coord.trim())))
        //   }
        //   placeholder="Coordinates (e.g., latitude, longitude)"
        // />
        //
        // <TextInput
        //   style={styles.input}
        //   value={description}
        //   onChangeText={setDescription}
        //   placeholder="Description"
        // />
        // <TextInput
        //   style={styles.input}
        //   value={String(rating)}
        //   onChangeText={(text) => setRating(Number(text))}
        //   placeholder="Rating (0-5)"
        //   keyboardType="numeric"
        // />
        // <TextInput
        //   style={styles.input}
        //   value={String(priority)}
        //   onChangeText={(text) => setPriority(Number(text))}
        //   placeholder="Priority (0-3)"
        //   keyboardType="numeric"
        // />
        // <TextInput
        //   style={styles.input}
        //   value={tag}
        //   onChangeText={setTag}
        //   placeholder="Tag"
        // />
        // <View style={styles.switchContainer}>
        //   <Text>Favourite:</Text>
        //   <Switch value={favourite} onValueChange={setFavourite} />
        // </View>
      }

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
