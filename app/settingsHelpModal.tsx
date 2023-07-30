import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View, Text } from "react-native";
import useDataContext from "../context/DataContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
  },
  containerDark: {
    flex: 1,
    padding: 20,
    backgroundColor: "#3c5063",
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: "black",
    marginTop: 50,
  },
  titleDark: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: "white",
    marginTop: 50,
  },
});

export default function SettingsInfoModal() {
  const { settings } = useDataContext();

  return (
    <View
      style={settings.isDarkModeOn ? styles.containerDark : styles.container}
    >
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View>
        <Text style={settings.isDarkModeOn ? styles.titleDark : styles.title}>
          Visited Distance Threshold
        </Text>
        <Text> ______________________________________ </Text>
        <Text
          style={{
            color: settings.isDarkModeOn ? "white" : "black",
            marginTop: 20,
          }}
        >
          When WanderList is opened, it checks your current location and
          compares it to the items in your bucketlist If you are nearby, the
          item is automatically marked as visited. How close the distance should
          be is determined by this value. Valid values are between
          {settings.MIN_VISITED_DISTANCE} to {settings.MAX_VISITED_DISTANCE}
          m. Setting it to zero disables this feature.
        </Text>
      </View>
    </View>
  );
}
