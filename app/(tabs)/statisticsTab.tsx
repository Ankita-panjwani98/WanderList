import { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import useDataContext from "../../context/DataContext";

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
});

export default function StatisticsTab() {
  const { bucketList, setBucketList } = useDataContext();
  const [visitedPlaces, setVisitedPlaces] = useState(0);
  const [unvisitedPlaces, setUnvisitedPlaces] = useState(0);

  useEffect(() => {
    const calculateStatistics = () => {
      let visitedCount = 0;
      let unvisitedCount = 0;

      bucketList.items.forEach((item) => {
        if (item.hasVisited) {
          visitedCount += 1;
        } else {
          unvisitedCount += 1;
        }
      });

      setVisitedPlaces(visitedCount);
      setUnvisitedPlaces(unvisitedCount);
    };
    calculateStatistics();
  }, [bucketList.items]);

  return bucketList.items.length > 0 ? (
    <ScrollView style={styles.container}>
      <View>
        <Text>Number of visited places: {visitedPlaces}</Text>
        <Text>Number of unvisited places: {unvisitedPlaces}</Text>
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
