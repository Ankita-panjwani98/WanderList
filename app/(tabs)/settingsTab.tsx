import { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import useDataContext from "../../context/DataContext";
import Settings from "../../DB/Settings";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
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
});

export default function SettingsTab() {
  const { settings, setSettings } = useDataContext();
  const [error, setError] = useState<string>("");

  const updateVisitedDistanceThreshold = (text: string) => {
    const value = Number(text);
    if (Number.isNaN(value) || value < 0 || value > 50) {
      setError(
        "Please enter a number between 1 and 50; use 0 to disable this feature!"
      );
      return;
    }
    setError("");
    setSettings(new Settings({ visitedDistanceThreshold: value }));
  };

  return (
    <>
      {error ? (
        <View style={styles.container}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <View style={styles.container}>
        <Text> Visited Distance Threshold (km): </Text>
        <TextInput
          style={styles.input}
          placeholder="Visited Distance Threshold"
          id="visitedDistanceThreshold"
          value={String(settings.visitedDistanceThreshold)}
          onChangeText={updateVisitedDistanceThreshold}
        />
      </View>
    </>
  );
}
