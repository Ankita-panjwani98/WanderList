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
import { geocodeAsync } from "expo-location";
import useDataContext from "../context/DataContext";
import BucketList from "../DB/BucketList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
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
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
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
});

export default function EditItemModal() {
  const { bucketList, setBucketList } = useDataContext();
  const router = useRouter();
  const { itemId } = useLocalSearchParams();

  const item = bucketList.items.find((i) => i.id === itemId);

  const [error, setError] = useState("");
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
    if (!item) return;

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

        const updatedItem = {
          ...item,
          ...{
            title: title || address,
            address,
            coordinates,
            updateOn: Date.now(),
          },
        };

        const updatedList = bucketList.items.map((i) =>
          i.id === updatedItem.id ? updatedItem : i
        );

        setBucketList(new BucketList(updatedList));

        router.back();
      })
      .catch((err) => {
        console.error(err);
        setError(
          "Unexpected error occured while fetching coordinates, please try again later!"
        );
      });
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

      <View style={styles.errorView}>
        <Text style={{ color: "red" }}> {error} </Text>
      </View>
    </View>
  );
}
