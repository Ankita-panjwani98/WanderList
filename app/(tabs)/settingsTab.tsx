import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Switch,
  Alert,
  Platform,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import useDataContext from "../../context/DataContext";
import BucketList from "../../DB/BucketList";
import Settings from "../../DB/Settings";
import { SettingsImage } from "../../components/Media";

const styles = StyleSheet.create({
  container: {
    marginTop: "15%",
    marginBottom: "10%",
    backgroundColor: "#f2f2f2",
    padding: 5,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 40,
    borderRadius: 10,
    height: 430,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  containerDarkMode: {
    marginTop: "15%",
    marginBottom: "10%",
    backgroundColor: "#617287",
    padding: 5,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 40,
    borderRadius: 10,
    height: 430,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
  input: {
    borderBottomWidth: 0.5,
    borderColor: "grey",
    paddingHorizontal: 5,
    fontSize: 16,
    textAlign: "center",
    color: "black",
    width: 100,
    fontFamily: "Montserrat",
  },
  inputDarkMode: {
    borderBottomWidth: 0.5,
    borderColor: "grey",
    paddingHorizontal: 5,
    fontSize: 16,
    textAlign: "center",
    color: "white",
    width: 100,
    fontFamily: "Montserrat",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    textAlign: "center",
  },
  errorTextDark: {
    fontSize: 12,
    color: "#f5a889",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  darkModeSetting: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  updateButtonContainer: {
    paddingLeft: 10,
  },
  clearListBtn: {
    backgroundColor: "#8a98a8",
    width: 100,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
  },
  clearListBtnDarkMode: {
    backgroundColor: "#d5dee8",
    width: 100,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
  },
  updateBtn: {
    backgroundColor: "#468f5a",
    padding: 10,
    width: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
  },
  deleteBtn: {
    backgroundColor: "#f0717d",
    width: 80,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
  },
  disabledUpdateBtn: {
    backgroundColor: "#d6d2d2",
    padding: 10,
    width: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
  },
});

export default function SettingsTab() {
  const { bucketList, setBucketList, settings, setSettings } = useDataContext();
  const [error, setError] = useState<string>("");
  const [visitedDistance, setVisitedDistance] = useState<string>(
    String(settings.visitedDistanceThreshold)
  );
  const router = useRouter();

  const handleDarkMode = () => {
    setSettings(
      new Settings({ ...settings, isDarkModeOn: !settings.isDarkModeOn })
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");

      const value = Number(visitedDistance);

      if (
        !Number.isNaN(value) &&
        (value === 0 ||
          (value >= settings.MIN_VISITED_DISTANCE &&
            value <= settings.MAX_VISITED_DISTANCE))
      ) {
        setSettings(
          new Settings({ ...settings, visitedDistanceThreshold: value })
        );
      } else {
        setError(
          `Please enter a number between ${settings.MIN_VISITED_DISTANCE} 
and ${settings.MAX_VISITED_DISTANCE}; use 0 to disable this feature!`
        );
      }
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitedDistance]);

  const updateVisitedDistanceThreshold = (e: string) => {
    const value = Number(e);
    setVisitedDistance(String(value));
  };

  const handleClearList = () => {
    if (bucketList.items.length) {
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
    } else {
      Alert.alert("No items to clear!!");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => router.push("settingsHelpModal")}
        style={{
          position: "absolute",
          right: 30,
          marginTop: 70,
          zIndex: 2,
        }}
      >
        <FontAwesome size={20} name="info-circle" color="grey" />
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: settings.isDarkModeOn ? "#3c5063" : "#f2f2f2",
          height: 1500,
        }}
      >
        <View style={{ alignItems: "center", marginTop: 80 }}>
          <Image
            source={SettingsImage}
            style={{ width: 250, height: 140, marginBottom: 10 }}
          />
        </View>
        <View
          style={
            settings.isDarkModeOn ? styles.containerDarkMode : styles.container
          }
        >
          <View style={{ marginBottom: 50 }}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Montserrat",
                fontSize: 18,
                color: settings.isDarkModeOn ? "white" : "#615d5d",
              }}
            >
              Manage your settings
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: settings.isDarkModeOn ? "white" : "#615d5d",
              }}
            >
              ________________________________
            </Text>
          </View>
          <View style={styles.row}>
            <Text
              style={{
                color: settings.isDarkModeOn ? "white" : "black",
                fontFamily: "Montserrat",
                fontSize: 16,
                width: 200,
              }}
            >
              Visited Distance Threshold (m):{" "}
            </Text>
            <TextInput
              style={
                settings.isDarkModeOn ? styles.inputDarkMode : styles.input
              }
              value={visitedDistance}
              onChangeText={updateVisitedDistanceThreshold}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>

          <View style={styles.row}>
            <Text
              style={{
                color: settings.isDarkModeOn ? "white" : "black",
                fontFamily: "Montserrat",
                fontSize: 16,
                width: 200,
              }}
            >
              Manage user data:
            </Text>

            <TouchableOpacity onPress={handleClearList}>
              <View
                style={
                  !bucketList.items.length
                    ? styles.clearListBtnDarkMode
                    : styles.clearListBtn
                }
              >
                <Text
                  style={{
                    color: !bucketList.items.length ? "black" : "white",
                    fontFamily: "Montserrat",
                  }}
                >
                  Clear List
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.darkModeSetting}>
            <Text
              style={{
                color: settings.isDarkModeOn ? "white" : "black",
                fontFamily: "Montserrat",
                fontSize: 16,
                width: 200,
              }}
            >
              Dark Mode:
            </Text>
            <Switch
              trackColor={{ false: "#e0dfdc", true: "#c5cad1" }}
              thumbColor={settings.isDarkModeOn ? "green" : "grey"}
              // ios_backgroundColor="#3e3e3e"
              onValueChange={handleDarkMode}
              value={settings.isDarkModeOn}
            />
          </View>
          {error ? (
            <View>
              <Text
                style={
                  settings.isDarkModeOn
                    ? styles.errorTextDark
                    : styles.errorText
                }
              >
                {error}
              </Text>
            </View>
          ) : (
            ""
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
