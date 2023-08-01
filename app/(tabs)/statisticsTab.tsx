import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { GraphImage } from "../../components/Media";
import useDataContext from "../../context/DataContext";
import Item from "../../DB/Item";
import getDistanceBetweenPoints from "../../utils/getDistanceBetweenPoints";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyListView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    marginTop: 10,
  },
  progressLabel: {
    marginTop: 5,
    color: "#918e8e",
  },
  progressLabelDark: {
    marginTop: 5,
    color: "#ebe8e1",
  },
  statisticsContainer: {
    marginTop: "10%",
    marginBottom: "10%",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    marginLeft: 8,
    marginRight: 8,
    height: "auto",
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

  statisticsContainerDarkMode: {
    marginTop: "10%",
    marginBottom: "10%",
    backgroundColor: "#617287",
    padding: 10,
    borderRadius: 10,
    marginLeft: 8,
    marginRight: 8,
    height: "auto",
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
  totalPlaces: {
    fontSize: 18,
    fontWeight: "600",
    color: "#327063",
    fontFamily: "Montserrat",
  },
  totalPlacesDark: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ebe8e1",
    fontFamily: "Montserrat",
  },
  totalPlacesContainer: {
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  numbercontainer: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: "#fad198",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  countContainer: {
    width: 24,
    height: 24,
    borderRadius: 25,
    backgroundColor: "#d6cfce",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  number: {
    color: "darkblue",
    fontFamily: "Montserrat",
    fontSize: 16,
  },
  visitedPlacesContainer: {
    marginTop: "10%",
    marginLeft: 10,
  },
  unvisitedPlacesContainer: {
    marginTop: "10%",
    marginLeft: 10,
  },
  visitedText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#ebeef2",
    fontFamily: "Montserrat",
  },
  visitedTextDark: {
    fontSize: 17,
    fontWeight: "600",
    color: "#ebe8e1",
    fontFamily: "Montserrat",
  },
  unvisitedText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#327063",
  },
  unvisitedTextDark: {
    fontSize: 17,
    fontWeight: "600",
    color: "#ebe8e1",
    fontFamily: "Montserrat",
  },
  textcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 10,
  },
  totalDistanceText: {
    marginTop: "18%",
    fontSize: 16,
    color: "#327063",
    fontFamily: "Montserrat",
  },
  totalDistanceTextDark: {
    marginTop: "18%",
    fontSize: 16,
    color: "#ebe8e1",
    fontFamily: "Montserrat",
  },
  totalDistanceNumber: {
    marginTop: "18%",
    fontSize: 16,
    paddingLeft: 10,
    color: "#7a7676",
    fontWeight: "700",
    fontFamily: "Montserrat",
  },
  totalDistanceNumberDark: {
    marginTop: "18%",
    fontSize: 16,
    paddingLeft: 10,
    color: "#deae3c",
    fontWeight: "700",
    fontFamily: "Montserrat",
  },
});

export default function StatisticsTab() {
  const { bucketList, settings } = useDataContext();
  const router = useRouter();

  const totalPlaces = bucketList.items.length;
  const visitedPlaces: Item[] = bucketList.items
    .filter((it) => it.hasVisited)
    .sort((a, b) => (a.updatedOn ?? 0) - (b.updatedOn ?? 0));
  const visitedCount = visitedPlaces.length;
  const unvisitedCount = totalPlaces - visitedCount;
  const favouriteCount = bucketList.items.reduce(
    (sum, item) => (item.favourite ? sum + 1 : sum),
    0
  );

  // Calculate distance in the order of visited places
  const totalDisplacement = visitedPlaces.reduce((sum, _, index, arr) => {
    if (index === 0) return 0;
    return (
      sum +
      getDistanceBetweenPoints(
        arr[index - 1].coordinates,
        arr[index].coordinates
      )
    );
  }, 0);

  const visitedPercentage =
    totalPlaces === 0 ? 0 : (visitedCount / totalPlaces) * 100;
  const unvisitedPercentage =
    totalPlaces === 0 ? 0 : (unvisitedCount / totalPlaces) * 100;
  const favouritePercentage =
    totalPlaces === 0 ? 0 : (favouriteCount / totalPlaces) * 100;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: settings.isDarkModeOn ? "#3c5063" : "#f2f5f4",
      }}
    >
      {bucketList.items.length > 0 ? (
        <ScrollView style={styles.container}>
          <TouchableOpacity
            onPress={() => router.push("statisticsHelpModal")}
            style={{
              position: "absolute",
              right: 20,
              zIndex: 2,
            }}
          >
            <FontAwesome size={20} name="info-circle" color="grey" />
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <Image source={GraphImage} style={{ width: 220, height: 220 }} />
          </View>

          <View
            style={
              settings.isDarkModeOn
                ? styles.statisticsContainerDarkMode
                : styles.statisticsContainer
            }
          >
            <View style={styles.totalPlacesContainer}>
              <View>
                <Text
                  style={
                    settings.isDarkModeOn
                      ? styles.totalPlacesDark
                      : styles.totalPlaces
                  }
                >
                  Saved Places:
                </Text>
              </View>

              <View style={styles.numbercontainer}>
                <Text style={styles.number}>{totalPlaces}</Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: -20,
                  color: settings.isDarkModeOn ? "white" : "darkgrey",
                }}
              >
                ______________________________
              </Text>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.visitedPlacesContainer}>
                <View style={styles.textcontainer}>
                  <View>
                    <Text
                      style={
                        settings.isDarkModeOn
                          ? styles.unvisitedTextDark
                          : styles.unvisitedText
                      }
                    >
                      Places visited:
                    </Text>
                  </View>
                  <View style={styles.countContainer}>
                    <Text style={styles.number}>{visitedCount}</Text>
                  </View>
                </View>

                <Progress.Bar
                  height={25}
                  progress={visitedPercentage / 100}
                  width={300}
                  animationType="spring"
                  borderRadius={30}
                  color="#45c449"
                />

                <Text
                  style={
                    settings.isDarkModeOn
                      ? styles.progressLabelDark
                      : styles.progressLabel
                  }
                >
                  {`${Math.round(visitedPercentage)}% visited`}
                </Text>
              </View>
              <View style={styles.unvisitedPlacesContainer}>
                <View style={styles.textcontainer}>
                  <View>
                    <Text
                      style={
                        settings.isDarkModeOn
                          ? styles.unvisitedTextDark
                          : styles.unvisitedText
                      }
                    >
                      Places not visited:
                    </Text>
                  </View>
                  <View style={styles.countContainer}>
                    <Text style={styles.number}>{unvisitedCount}</Text>
                  </View>
                </View>

                <Progress.Bar
                  height={25}
                  progress={unvisitedPercentage / 100}
                  width={300}
                  animationType="spring"
                  borderRadius={30}
                  color="#cf6146"
                />

                <Text
                  style={
                    settings.isDarkModeOn
                      ? styles.progressLabelDark
                      : styles.progressLabel
                  }
                >
                  {`${Math.round(unvisitedPercentage)}% unvisited`}
                </Text>
              </View>

              <View style={styles.unvisitedPlacesContainer}>
                <View style={styles.textcontainer}>
                  <View>
                    <Text
                      style={
                        settings.isDarkModeOn
                          ? styles.unvisitedTextDark
                          : styles.unvisitedText
                      }
                    >
                      Favourite places:
                    </Text>
                  </View>
                  <View style={styles.countContainer}>
                    <Text style={styles.number}>{favouriteCount}</Text>
                  </View>
                </View>

                <Progress.Bar
                  height={25}
                  progress={favouritePercentage / 100}
                  width={300}
                  animationType="spring"
                  borderRadius={30}
                  color="#f2c477"
                />

                <Text
                  style={
                    settings.isDarkModeOn
                      ? styles.progressLabelDark
                      : styles.progressLabel
                  }
                >
                  {`${Math.round(favouritePercentage)}% favourite`}
                </Text>
              </View>
            </View>
            <View style={styles.totalPlacesContainer}>
              <Text
                style={
                  settings.isDarkModeOn
                    ? styles.totalDistanceTextDark
                    : styles.totalDistanceText
                }
              >
                Distance Traveled: 🚀
              </Text>
              <Text
                style={
                  settings.isDarkModeOn
                    ? styles.totalDistanceNumberDark
                    : styles.totalDistanceNumber
                }
              >
                {totalDisplacement.toFixed(2)} kms
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyListView}>
          <Text style={{ color: settings.isDarkModeOn ? "white" : "grey" }}>
            Add any new place to see the statistics.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
