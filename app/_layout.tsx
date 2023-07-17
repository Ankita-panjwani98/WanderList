import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import SpaceMono from "../assets/fonts/SpaceMono-Regular.ttf";
import Manrope from "../assets/fonts/Manrope-VariableFont_wght.ttf";
import Firacode from "../assets/fonts/FiraCode-VariableFont_wght.ttf";
import { DataProvider } from "../context/DataContext";
import RootLayoutStack from "./rootLayoutStack";

// eslint-disable-next-line camelcase
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loadedFonts] = useFonts({
    SpaceMono,
    Firacode,
    Manrope,
    ...FontAwesome.font,
  });
  if (!loadedFonts) return <SplashScreen />;

  return (
    <DataProvider>
      <RootLayoutStack />
    </DataProvider>
  );
}
