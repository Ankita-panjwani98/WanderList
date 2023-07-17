import { Image, TouchableOpacity, Text } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import useDataContext from "../context/DataContext";
import Settings from "../DB/Settings";
import IconGold from "../assets/images/icon-gold.png";
import IconBlue from "../assets/images/icon-blue.png";

function Done({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={onPress}>
      <Text style={{ fontSize: 16 }}>Done</Text>
    </TouchableOpacity>
  );
}

export default function OnBoardingScreen() {
  const { settings, setSettings } = useDataContext();

  const handleDone = () => {
    setSettings(new Settings({ ...settings, isFirstLaunch: false }));
  };

  return (
    <Onboarding
      DoneButtonComponent={Done}
      onDone={handleDone}
      pages={[
        {
          backgroundColor: "#F4FFE2",
          image: (
            <Image style={{ width: 200, height: 200 }} source={IconGold} />
          ),
          title: "Manage Your Travel Wishlist",
          subtitle:
            "WanderList is an app designed to help you manage your travel wishlist. Easily add new destinations you wish to visit and explore a world of possibilities.",
        },
        {
          backgroundColor: "#F4FFE2",
          image: (
            <Image style={{ width: 200, height: 200 }} source={IconBlue} />
          ),
          title: "Organize Visited and Unvisited Places",
          subtitle:
            "With WanderList, keep track of the places you've visited and the ones still on your list. Stay organized and mark your travel achievements.",
        },
        {
          backgroundColor: "#F4FFE2",
          image: (
            <Image style={{ width: 200, height: 200 }} source={IconGold} />
          ),
          title: "Visualize Your Journey",
          subtitle:
            "See all your travel destinations on a map and visualize your journey with WanderList. Get a comprehensive view of your adventures and plan future trips.",
        },
      ]}
    />
  );
}
