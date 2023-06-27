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

export default function StatisticsHelpModal() {
  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View>
        <Text style={styles.title}>How is distance calculated?</Text>
        <Text style={{ marginVertical: 10 }}>
          Technically, we calculate the &quot;displacement&quot; between visited
          items, in the order they were visited. So, if you have 3 places: A, B
          and C. And distance between them is as below, then following will be
          the values for total distances assuming those places are marked
          visited:
        </Text>
        <Text>Only A, B or C: 0 km</Text>
        <Text>A - B: 1 km</Text>
        <Text>B - C: 2 km</Text>
        <Text>A - C: 3 km</Text>
        <Text>A - B - C: 1 + 2 = 3 km</Text>
        <Text>A - C - B: 3 + 2 = 5 km</Text>
      </View>
    </View>
  );
}
