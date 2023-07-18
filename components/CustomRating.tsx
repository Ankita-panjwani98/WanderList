import { View, Text } from "react-native";
import { Rating } from "react-native-ratings";

type CustomRatingProps = {
  label: string;
  type: "star" | "heart" | "bell" | "rocket";
  ratingCount: 1 | 2 | 3 | 4 | 5;
  startingValue?: 0 | 1 | 2 | 3 | 4 | 5;
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
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Text>{label}</Text>
      <Rating
        minValue={0}
        fractions={0}
        startingValue={startingValue ?? ratingCount / 2}
        onFinishRating={handleRatingChange}
        imageSize={imageSize}
        type={type}
        tintColor="#f2f2f2"
        ratingCount={ratingCount}
      />
    </View>
  );
}

export default CustomRating;
