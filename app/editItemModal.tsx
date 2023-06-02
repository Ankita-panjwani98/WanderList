import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Item from "../DB/Item";

export default function EditItemModal() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item, updateItem } = route.params;

  const [title, setTitle] = useState(item.title);
  const [address, setAddress] = useState(item.address);
  const [hasVisited, setHasVisited] = useState(item.hasVisited);
  const [coordinates, setCoordinates] = useState(item.coordinates || []);
  const [description, setDescription] = useState(item.description || "");
  const [rating, setRating] = useState(item.rating || 0);
  const [priority, setPriority] = useState(item.priority || 0);
  const [tag, setTag] = useState(item.tag || "");
  const [favourite, setFavourite] = useState(item.favourite || false);

  const handleSave = () => {
    const updatedItem = new Item({
      id: item.id,
      title,
      address,
      hasVisited,
      coordinates,
      description,
      rating,
      priority,
      tag,
      favourite,
      createdOn: item.createdOn,
      updatedOn: Date.now(),
    });

    updateItem(updatedItem);

    navigation.goBack();
  };

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

      <View style={styles.switchContainer}>
        <Text>Visited/Opened:</Text>
        <Switch value={hasVisited} onValueChange={setHasVisited} />
      </View>

      <TextInput
        style={styles.input}
        value={coordinates.join(", ")}
        onChangeText={(text) =>
          setCoordinates(text.split(",").map((coord) => Number(coord.trim())))
        }
        placeholder="Coordinates (e.g., latitude, longitude)"
      />

      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />

      <TextInput
        style={styles.input}
        value={String(rating)}
        onChangeText={(text) => setRating(Number(text))}
        placeholder="Rating (0-5)"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        value={String(priority)}
        onChangeText={(text) => setPriority(Number(text))}
        placeholder="Priority (0-3)"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        value={tag}
        onChangeText={setTag}
        placeholder="Tag"
      />

      <View style={styles.switchContainer}>
        <Text>Favourite:</Text>
        <Switch value={favourite} onValueChange={setFavourite} />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
