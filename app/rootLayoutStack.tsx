import { SplashScreen, Stack } from "expo-router";
import useDataContext from "../context/DataContext";
import OnBoardingScreen from "./onBoardingScreen";

export default function RootLayoutStack() {
  const { settings, isFileRead } = useDataContext();

  if (!isFileRead) return <SplashScreen />;
  if (settings.isFirstLaunch) {
    return <OnBoardingScreen />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="itemModal"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name="statisticsHelpModal"
        options={{ headerTitle: "Statistics Help", presentation: "modal" }}
      />
      <Stack.Screen
        name="settingsHelpModal"
        options={{ headerTitle: "Settings Help", presentation: "modal" }}
      />
    </Stack>
  );
}
