import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  // Switch,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Item from "../DB/Item";

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
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "80%",
  },
  addButton: {
    flex: 1,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "red",
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
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  // const [hasVisited, setHasVisited] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number] | undefined>(
    undefined
  );
  // const [description, setDescription] = useState("");
  // const [rating, setRating] = useState<number | undefined>();
  // const [priority, setPriority] = useState<number | undefined>();
  // const [tag, setTag] = useState("");
  // const [favourite, setFavourite] = useState(false);

  const navigation = useNavigation();

  const resetInputs = () => {
    setTitle("");
    setAddress("");
    // setHasVisited(false);
    setCoordinates(undefined);
    // setDescription("");
    // setRating(undefined);
    // setPriority(undefined);
    // setTag("");
    // setFavourite(false);
  };

  const handleAddItem = () => {
    const newItem = new Item({
      title,
      address,
      // hasVisited,
      coordinates,
      // description,
      // rating,
      // priority,
      // tag,
      // favourite,
    });

    resetInputs();

    navigation.navigate("two", { newItem });
  };

  const handleCancel = () => {
    resetInputs();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Item</Text>
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
