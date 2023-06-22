import {
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  View,
  Image,
} from "react-native";
import * as Progress from "react-native-progress";
import graphImage from "../../assets/images/graph.png";
import useDataContext from "../../context/DataContext";
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
  statisticsContainer: {
    marginTop: "10%",
    marginBottom: "10%",
    backgroundColor: "#f2f5f4",
    padding: 10,
    borderRadius: 10,
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
    fontSize: 20,
    fontWeight: "600",
    color: "#327063",
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
  divider: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "80%",
    marginBottom: "2%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  numbercontainer: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: "#FFC26E",
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
    color: "#327063",
  },
  unvisitedText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#327063",
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
    fontWeight: 600,
  },
  totalDistanceNumber: {
    marginTop: "18%",
    fontSize: 16,
    paddingLeft: 10,
    color: "#7a7676",
    fontWeight: 700,
  },
});

export default function StatisticsTab() {
  const { bucketList, setBucketList } = useDataContext();

  let visitedCount = 0;
  let unvisitedCount = 0;
  let favouriteCount = 0;
  let totalDisplacement = 0;

  bucketList.items.forEach((item, index) => {
    if (item.favourite) {
      favouriteCount += 1;
    }
    if (item.hasVisited) {
      visitedCount += 1;

      if (index > 0) {
        const prevLocation = bucketList.items[index - 1].coordinates;
        const currentLocation = item.coordinates;
        const distance = getDistanceBetweenPoints(
          prevLocation,
          currentLocation
        );
        totalDisplacement += distance;
      }
    } else {
      unvisitedCount += 1;
    }
  });

  const totalPlaces = visitedCount + unvisitedCount;
  const visitedPercentage =
    totalPlaces === 0 ? 0 : (visitedCount / totalPlaces) * 100;
  const unvisitedPercentage =
    totalPlaces === 0 ? 0 : (unvisitedCount / totalPlaces) * 100;
  const favouritePercentage =
    totalPlaces === 0 ? 0 : (favouriteCount / totalPlaces) * 100;

  return bucketList.items.length > 0 ? (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image source={graphImage} style={{ width: 220, height: 220 }} />
      </View>

      <View style={styles.statisticsContainer}>
        {/* total places */}
        <View style={styles.totalPlacesContainer}>
          <View>
            <Text style={styles.totalPlaces}>Saved Places:</Text>
          </View>

          <View style={styles.numbercontainer}>
            <Text style={styles.number}>{totalPlaces}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* progress container */}
        <View style={styles.progressContainer}>
          {/* visited */}
          <View style={styles.visitedPlacesContainer}>
            <View style={styles.textcontainer}>
              <View>
                <Text style={styles.unvisitedText}>Places visited:</Text>
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

            <Text style={styles.progressLabel}>{`${Math.round(
              visitedPercentage
            )}% visited`}</Text>
          </View>
          {/* unvisited */}
          <View style={styles.unvisitedPlacesContainer}>
            <View style={styles.textcontainer}>
              <View>
                <Text style={styles.unvisitedText}>Places not visited:</Text>
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

            <Text style={styles.progressLabel}>{`${Math.round(
              unvisitedPercentage
            )}% unvisited`}</Text>
          </View>

          <View style={styles.unvisitedPlacesContainer}>
            <View style={styles.textcontainer}>
              <View>
                <Text style={styles.unvisitedText}>Favourite places:</Text>
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

            <Text style={styles.progressLabel}>{`${Math.round(
              favouritePercentage
            )}% favourite`}</Text>
          </View>
        </View>
        <View style={styles.totalPlacesContainer}>
          <Text style={styles.totalDistanceText}>Distance Traveled: 🚀</Text>
          <Text style={styles.totalDistanceNumber}>
            {totalDisplacement.toFixed(2)} kms
          </Text>
        </View>
      </View>
    </ScrollView>
  ) : (
    <View style={styles.emptyListView}>
      <Text style={{ color: "grey" }}>
        Add any new place to see the statistics.
      </Text>
    </View>
  );
}
