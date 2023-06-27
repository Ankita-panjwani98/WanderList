import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View, StyleSheet, Button, Alert } from "react-native";
import useDataContext from "../../context/DataContext";
import BucketList from "../../DB/BucketList";
import Settings from "../../DB/Settings";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    borderBottomWidth: 0.5,
    borderColor: "grey",
    paddingHorizontal: 5,
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    fontSize: 12,
    color: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default function SettingsTab() {
  const { bucketList, setBucketList, settings, setSettings } = useDataContext();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [visitedDistance, setVisitedDistance] = useState<string>(
    String(settings.visitedDistanceThreshold)
  );

  const handleCancel = () => {
    setVisitedDistance(String(settings.visitedDistanceThreshold));
    setError("");
    router.back();
  };

  const updateVisitedDistanceThreshold = () => {
    const value = Number(visitedDistance);
    if (
      Number.isNaN(value) ||
      (value !== 0 &&
        (value < settings.MIN_VISITED_DISTANCE ||
          value > settings.MAX_VISITED_DISTANCE))
    ) {
      setError(
        `Please enter a number between ${settings.MIN_VISITED_DISTANCE} 
and ${settings.MAX_VISITED_DISTANCE}; use 0 to disable this feature!`
      );
      setVisitedDistance(String(settings.visitedDistanceThreshold));
      return;
    }
    setError("");
    setSettings(new Settings({ visitedDistanceThreshold: value }));
    setVisitedDistance(String(value));
  };

  const handleClearList = () => {
    Alert.alert(
      "Clear List",
      "Are you sure you want to remove all items from the list? This process is irreversible!",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            setBucketList(new BucketList([]));
          },
        },
      ]
    );
  };

  return (
    <>
      {error ? (
        <View style={styles.container}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <View style={styles.container}>
        <View style={styles.row}>
          <Text>Visited Distance Threshold (m): </Text>
          <TextInput
            style={styles.input}
            value={visitedDistance}
            onChangeText={setVisitedDistance}
            keyboardType="numeric"
            maxLength={5}
          />
        </View>

        <View style={styles.row}>
          <Text>Manage user data:</Text>
          <Button
            color="red"
            title="Clear List"
            onPress={handleClearList}
            disabled={!bucketList.items.length}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button color="green" title="Cancel" onPress={handleCancel} />
        <Button
          color="orange"
          title="Update"
          onPress={updateVisitedDistanceThreshold}
          disabled={
            String(settings.visitedDistanceThreshold) === visitedDistance
          }
        />
      </View>
    </>
  );
}
