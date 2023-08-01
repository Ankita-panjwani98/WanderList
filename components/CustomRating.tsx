import { View, Text } from "react-native";
import { Rating } from "react-native-ratings";
import useDataContext from "../context/DataContext";

type CustomRatingProps = {
  label: string;
  type: "star" | "heart" | "bell" | "rocket";
  ratingCount: number;
  startingValue?: number;
  imageSize?: number;
  handleRatingChange: (r: number) => void;
};

function CustomRating({
  label,
  type,
  ratingCount,
  startingValue = 0,
  imageSize = 25,
  handleRatingChange,
}: CustomRatingProps) {
  const { settings } = useDataContext();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
        marginTop: 20,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: settings.isDarkModeOn ? "white" : "#3c5063",
            marginLeft: 45,
          }}
        >
          {label}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Rating
          minValue={0}
          fractions={0}
          startingValue={startingValue ?? ratingCount / 2}
          onFinishRating={handleRatingChange}
          imageSize={imageSize}
          type={type}
          ratingColor="#e0dfdc"
          tintColor={settings.isDarkModeOn ? "#3c5063" : "#f2f2f2"}
          ratingCount={ratingCount}
        />
      </View>
    </View>
  );
}

export default CustomRating;
