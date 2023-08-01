import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
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
    fontFamily: "Montserrat",
  },
  titleDark: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: "white",
    marginTop: 50,
    fontFamily: "Montserrat",
  },
  distanceTextStyle: {
    color: "black",
    fontFamily: "Montserrat",
  },
  distanceTextStyleDark: {
    color: "white",
    fontFamily: "Montserrat",
  },
});

export default function StatisticsHelpModal() {
  const router = useRouter();

  const { settings } = useDataContext();
  const handleCancel = () => {
    router.back();
  };
  return (
    <View
      style={settings.isDarkModeOn ? styles.containerDark : styles.container}
    >
      <TouchableOpacity onPress={handleCancel}>
        <Text
          style={{
            color: settings.isDarkModeOn ? "white" : "black",
            padding: 10,
            textAlign: "left",
          }}
        >
          <AntDesign
            name="caretleft"
            size={24}
            color={settings.isDarkModeOn ? "white" : "#666262"}
          />
        </Text>
      </TouchableOpacity>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View>
        <Text style={settings.isDarkModeOn ? styles.titleDark : styles.title}>
          How is distance calculated?
        </Text>
        <Text style={{ color: settings.isDarkModeOn ? "white" : "darkgrey" }}>
          {" "}
          _____________________________________{" "}
        </Text>
        <Text
          style={{
            marginVertical: 10,
            color: settings.isDarkModeOn ? "white" : "black",
            fontFamily: "Montserrat",
          }}
        >
          Technically, we calculate the &quot;displacement&quot; between visited
          items, in the order they were visited. So, if you have 3 places: A, B
          and C. And distance between them is as below, then following will be
          the values for total distances assuming those places are marked
          visited:
        </Text>
        <Text
          style={
            settings.isDarkModeOn
              ? styles.distanceTextStyleDark
              : styles.distanceTextStyle
          }
        >
          Only A, B or C: 0 km
        </Text>
        <Text
          style={
            settings.isDarkModeOn
              ? styles.distanceTextStyleDark
              : styles.distanceTextStyle
          }
        >
          A - B: 1 km
        </Text>
        <Text
          style={
            settings.isDarkModeOn
              ? styles.distanceTextStyleDark
              : styles.distanceTextStyle
          }
        >
          B - C: 2 km
        </Text>
        <Text
          style={
            settings.isDarkModeOn
              ? styles.distanceTextStyleDark
              : styles.distanceTextStyle
          }
        >
          A - C: 3 km
        </Text>
        <Text
          style={
            settings.isDarkModeOn
              ? styles.distanceTextStyleDark
              : styles.distanceTextStyle
          }
        >
          A - B - C: 1 + 2 = 3 km
        </Text>
        <Text
          style={
            settings.isDarkModeOn
              ? styles.distanceTextStyleDark
              : styles.distanceTextStyle
          }
        >
          A - C - B: 3 + 2 = 5 km
        </Text>
      </View>
    </View>
  );
}
