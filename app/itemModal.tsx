import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Image,
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
import CustomRating from "../components/CustomRating";
import { IconGreen, IconGrey } from "../components/Media";
import generateUUID from "../utils/generateUUID";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
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
    alignItems: "center",
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

export default function ItemModal() {
  const router = useRouter();

  const { bucketList, setBucketList } = useDataContext();
  const { itemId } = useLocalSearchParams();
  const item = bucketList.items.find((i) => i.id === itemId);

  const [error, setError] = useState("");
  const [title, setTitle] = useState(item?.title ?? "");
  const [address, setAddress] = useState(item?.address ?? "");
  const [coordinates, setCoordinates] = useState<
    LocationGeocodedLocation | undefined
  >(item?.coordinates);
  const [hasVisited, setHasVisited] = useState(item?.hasVisited || false);
  const [description, setDescription] = useState(item?.description ?? "");
  const [rating, setRating] = useState(item?.rating ?? 0);
  const [priority, setPriority] = useState(item?.priority ?? 0);
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

    const newItem = {
      id: item?.id ?? generateUUID(),
      createdOn: item?.createdOn ?? Date.now(),
      title: title || address,
      address,
      coordinates,
      hasVisited,
      description,
      rating,
      priority,
      favourite,
      updatedOn: Date.now(),
    };

    let updatedList;

    if (!itemId) {
      // Creating an item
      updatedList = new BucketList(bucketList.items.concat(newItem));
    } else {
      // Updating an item
      updatedList = new BucketList(
        bucketList.items.map((i) => (i.id === newItem.id ? newItem : i))
      );
    }

    setBucketList(updatedList);

    router.push("MapTab");
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

  return (
    <>
      <View style={styles.buttonContainer}>
        {item ? (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteItem(item)}
          >
            <FontAwesome
              size={30}
              style={{ marginBottom: -3 }}
              name="trash"
              color="red"
            />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setFavourite(!favourite)}
        >
          <FontAwesome
            size={30}
            style={{ marginBottom: -3 }}
            name="star"
            color={favourite ? "orange" : "lightgray"}
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

        <CustomRating
          type="bell"
          handleRatingChange={(p) => setPriority(p)}
          label="Priority: "
          ratingCount={3}
        />

        <CustomRating
          type="heart"
          handleRatingChange={(r) => setRating(r)}
          label="Rating: "
          ratingCount={5}
        />

        <View style={styles.switchContainer}>
          <Text>Visited?</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setHasVisited(!hasVisited)}
          >
            {hasVisited ? (
              <Image
                source={IconGreen}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            ) : (
              <Image source={IconGrey} style={{ width: 30, height: 30 }} />
            )}
          </TouchableOpacity>
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
