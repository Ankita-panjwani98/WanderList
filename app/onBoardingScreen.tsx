import { Image, TouchableOpacity, Text } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import useDataContext from "../context/DataContext";
import Settings from "../DB/Settings";
import IconGold from "../assets/images/1.png";
import IconBlue from "../assets/images/2.png";
import IconGreen from "../assets/images/3.png";

function Done({ onPress }) {
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

  const handleSkip = () => {
    setSettings(new Settings({ ...settings, isFirstLaunch: false }));
  };

  return (
    <Onboarding
      DoneButtonComponent={Done}
      onDone={handleDone}
      onSkip={handleSkip}
      titleStyles={{
        marginTop: -100,
        fontFamily: "Firacode",
        fontWeight: "bold",
      }}
      subTitleStyles={{ marginTop: -8, fontFamily: "SpaceMono", fontSize: 17 }}
      pages={[
        {
          backgroundColor: "#dce4f5",
          image: (
            <Image style={{ width: 350, height: 350 }} source={IconGreen} />
          ),
          title: "Manage Your Travel Wishlist",
          subtitle:
            "Easily add new destinations you wish to visit and explore a world of possibilities.",
        },
        {
          backgroundColor: "#F4FFE2",
          image: (
            <Image style={{ width: 350, height: 350 }} source={IconGold} />
          ),
          title: "Organize Visited and Unvisited Places",
          subtitle:
            "With WanderList, stay organized and mark your travel achievements by keeping track of the places you've visited and the ones still on your list.",
        },
        {
          backgroundColor: "#d8f2f1",
          image: (
            <Image style={{ width: 350, height: 350 }} source={IconBlue} />
          ),
          title: "Visualize Your Travel Journey",
          subtitle:
            "See all your travel destinations on a map and visualize your journey with WanderList.",
        },
      ]}
    />
  );
}
