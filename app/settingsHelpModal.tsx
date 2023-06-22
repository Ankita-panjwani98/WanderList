import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
});

export default function SettingsInfoModal() {
  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View>
        <Text style={styles.title}>Visited Distance Threshold</Text>
        <Text>
          When WanderList is opened, it checks your current location and
          compares it to the items in your bucketlist If you are nearby, the
          item is automatically marked as visited. How close the distance should
          be is determined by this value. Valid values are between 1 to 50 km.
          Setting it to zero disables this feature.
        </Text>
      </View>
    </View>
  );
}
