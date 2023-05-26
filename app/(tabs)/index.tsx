import { StyleSheet, Text, View } from "react-native";
import DB from "../../DB";

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
});

export default function TabOneScreen() {
  // This is how to read data
  // const bucketList = DB.bucketList;
  // const settings = DB.settings;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
    </View>
  );
}
