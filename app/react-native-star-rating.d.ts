declare module "react-native-star-rating" {
  import { FC } from "react";
  import { StyleProp, ViewStyle } from "react-native";

  export interface StarRatingProps {
    disabled?: boolean;
    maxStars?: number;
    rating?: number;
    selectedStar?: (rating: number) => void;
    starSize?: number;
    fullStarColor?: string;
    emptyStarColor?: string;
    halfStarColor?: string;
    starStyle?: StyleProp<ViewStyle>;
  }

  const StarRating: FC<StarRatingProps>;

  export default StarRating;
}
