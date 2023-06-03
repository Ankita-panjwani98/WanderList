import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import SpaceMono from "../assets/fonts/SpaceMono-Regular.ttf";
import "../DB";

// eslint-disable-next-line camelcase
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="infoModal" options={{ presentation: "modal" }} />
      <Stack.Screen name="addItemModal" options={{ presentation: "modal" }} />
      <Stack.Screen name="editItemModal" options={{ presentation: "modal" }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [loadedFonts] = useFonts({ SpaceMono, ...FontAwesome.font });
  return loadedFonts ? <RootLayoutNav /> : <SplashScreen />;
}
