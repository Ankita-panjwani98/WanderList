import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Text,
  // Switch,
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
    borderBottomWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    width: "80%",
    marginBottom: 10,
  },
  addressInput: {
    borderColor: "black",
    color: "black",
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
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorView: {
    color: "red",
    maxWidth: "80%",
    padding: 10,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default function AddNewItemModalScreen() {
  const { bucketList, setBucketList } = useDataContext();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  // const [hasVisited, setHasVisited] = useState(false);
  // const [coordinates, setCoordinates] = useState<[number, number] | undefined>(
  //   undefined,
  // );
  // const [description, setDescription] = useState("");
  // const [rating, setRating] = useState<number | undefined>();
  // const [priority, setPriority] = useState<number | undefined>();
  // const [tag, setTag] = useState("");
  // const [favourite, setFavourite] = useState(false);

  const [error, setError] = useState("");

  const resetInputs = () => {
    setTitle("");
    setAddress("");
    // setHasVisited(false);
    // setCoordinates(undefined);
    // setDescription("");
    // setRating(undefined);
    // setPriority(undefined);
    // setTag("");
    // setFavourite(false);
  };

  const handleAddItem = () => {
    setError("");

    if (!address) {
      setError("Address input is required!");
      return;
    }

    geocodeAsync(address)
      .then((data) => {
        const [coordinates] = data;

        if (!coordinates) {
          setError(
            "Location coordinates could not be fetched! Please try with a different address."
          );
          return;
        }

        const newItem = new Item({
          id: generateUUID(),
          title: title || address,
          address,
          coordinates,
          createdOn: Date.now(),
          // hasVisited,
          // description,
          // rating,
          // priority,
          // tag,
          // favourite,
        });
        const newBucketList = new BucketList(bucketList.items.concat(newItem));
        setBucketList(newBucketList);

        // TODO: Go to map from here maybe?
        router.push("listTab");
      })
      .catch((err) => {
        console.error(err);
        setError(
          "Unexpected error occured while fetching coordinates, please try again later!"
        );
      });
  };

  const handleCancel = () => {
    resetInputs();
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />

      <TextInput
        style={[styles.input, styles.addressInput]}
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

      <View style={styles.errorView}>
        <Text style={{ color: "red" }}> {error} </Text>
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
