import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { LocationGeocodedLocation } from "expo-location";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import generateUUID from "../utils/generateUUID";
import useDataContext from "../context/DataContext";
import Item from "../DB/Item";
import BucketList from "../DB/BucketList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    width: "80%",
    marginBottom: 10,
  },
  addressInput: {
    backgroundColor: "white",
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
});

export default function AddNewItemModalScreen() {
  const { bucketList, setBucketList } = useDataContext();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [coordinates, setCoordinates] = useState<
    LocationGeocodedLocation | undefined
  >();
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number | undefined>();
  const [priority, setPriority] = useState<number | undefined>();
  // const [tag, setTag] = useState("");
  const [favourite, setFavourite] = useState(false);

  const [error, setError] = useState("");

  const resetInputs = () => {
    setTitle("");
    setAddress("");
    setHasVisited(false);
    setCoordinates(undefined);
    setDescription("");
    setRating(undefined);
    setPriority(undefined);
    // setTag("");
    setFavourite(false);
  };

  const handleAddItem = () => {
    setError("");

    if (!address) {
      setError("Address input is required!");
      return;
    }

    if (!coordinates) {
      setError("Coordinates not found!");
      return;
    }

    const newItem = new Item({
      id: generateUUID(),
      title: title || address,
      address,
      coordinates,
      createdOn: Date.now(),
      hasVisited,
      description,
      rating,
      priority,
      // tag,
      favourite,
    });

    const newBucketList = new BucketList(bucketList.items.concat(newItem));
    setBucketList(newBucketList);

    router.push("listTab");
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
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />

      <GooglePlacesAutocomplete
        placeholder="Address"
        onPress={(_, details = null) => {
          if (!details) {
            setError("Error while adding place: Coordinates not found!");
            return;
          }

          const {
            location: { lat: latitude, lng: longitude },
          } = details.geometry;

          setCoordinates({ latitude, longitude });
          setAddress(details.formatted_address);
        }}
        query={{
          key: Constants.expoConfig?.android?.config?.googleMaps?.apiKey,
          language: "en",
        }}
        styles={{
          container: {
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            flex: 0,
          },
          textInput: { ...styles.input, ...styles.addressInput },
        }}
        suppressDefaultStyles={false}
        enablePoweredByContainer={false}
        debounce={200}
        minLength={2}
        disableScroll
        fetchDetails
      />

      <TextInput
        style={styles.input}
        value={rating !== undefined ? String(rating) : ""}
        onChangeText={(text) => setRating(Number(text))}
        placeholder="Rating (0-5)"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={priority !== undefined ? String(priority) : ""}
        onChangeText={(text) => setPriority(Number(text))}
        placeholder="Priority (0-3)"
        keyboardType="numeric"
      />
      {/* <TextInput
        style={styles.input}
        value={tag}
        onChangeText={setTag}
        placeholder="Tag"
      /> */}
      <View style={styles.switchContainer}>
        <Text>Opened/Visited:</Text>
        <Switch value={hasVisited} onValueChange={setHasVisited} />
      </View>

      <View style={styles.switchContainer}>
        <Text>Favourite:</Text>
        <Switch value={favourite} onValueChange={setFavourite} />
      </View>

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
