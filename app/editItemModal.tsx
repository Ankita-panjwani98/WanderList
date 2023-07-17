import { useState } from "react";
import StarRating from "react-native-star-rating";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LocationGeocodedLocation } from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import useDataContext from "../context/DataContext";
import BucketList from "../DB/BucketList";
import Item from "../DB/Item";

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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  deleteButton: {
    marginHorizontal: 10,
  },
  bottomButtonContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
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
  const [coordinates, setCoordinates] = useState<
    LocationGeocodedLocation | undefined
  >(item?.coordinates);
  const [hasVisited, setHasVisited] = useState(item?.hasVisited);
  const [description, setDescription] = useState(item?.description || "");
  const [selectedRating, setRating] = useState(item?.rating || undefined);
  const [priority, setPriority] = useState(item?.priority || undefined);
  const [favourite, setFavourite] = useState(item?.favourite || false);

  const handleSave = () => {
    setError("");

    if (!address) {
      setError("Address input is required!");
      return;
    }

    if (!coordinates) {
      setError("Coordinates not found!");
      return;
    }

    if (selectedRating && (selectedRating < 0 || selectedRating > 5)) {
      setError("Rating should be set in the range (0-5)!");
      return;
    }

    if (priority && (priority < 0 || priority > 3)) {
      setError("Priority should be set in the range (0-3)!");
      return;
    }

    const updatedItem = {
      ...item!,
      title: title || address!,
      address,
      coordinates,
      updatedOn: Date.now(),
      hasVisited: hasVisited!,
      description,
      rating: selectedRating,
      priority,
      favourite,
    };

    const updatedList = bucketList.items.map((i) =>
      i.id === updatedItem.id ? updatedItem : i
    );

    setBucketList(new BucketList(updatedList));

    router.back();
  };

  const handleDeleteItem = (i: Item) => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete ${i.title} item?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedList = bucketList.items.filter((x) => x.id !== i.id);
            setBucketList(new BucketList(updatedList));
            router.back();
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    router.back();
  };

  if (!item) return <Text>Item not found</Text>;

  return (
    <>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteItem(item)}
        >
          <FontAwesome
            size={30}
            style={{ marginBottom: -3 }}
            name="trash"
            color="#db5c40"
          />
        </TouchableOpacity>
      </View>

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
          placeholder={address || "Address"}
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
            textInput: styles.input,
          }}
          suppressDefaultStyles={false}
          enablePoweredByContainer={false}
          debounce={200}
          minLength={2}
          disableScroll
          fetchDetails
        />

        <StarRating
          disabled={false}
          maxStars={5}
          rating={selectedRating !== undefined ? selectedRating : 0}
          selectedStar={(rating) => setRating(rating)}
          starSize={25}
          fullStarColor="gold"
          emptyStarColor="gray"
        />

        <TextInput
          style={styles.input}
          value={priority !== undefined ? String(priority) : ""}
          onChangeText={(text) => setPriority(Number(text))}
          placeholder="Priority (0-3)"
          keyboardType="numeric"
        />

        <View style={styles.switchContainer}>
          <Text>Opened/Visited:</Text>
          <Switch value={hasVisited} onValueChange={setHasVisited} />
        </View>

        <View style={styles.switchContainer}>
          <Text>Favourite:</Text>
          <Switch value={favourite} onValueChange={setFavourite} />
        </View>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.errorView}>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      </View>
    </>
  );
}
