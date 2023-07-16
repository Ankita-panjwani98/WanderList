import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import useDataContext from "../context/DataContext";
import Settings from "../DB/Settings";
import OnBoardingScreen from "./onBoardingScreen";

export default function RootLayoutStack() {
  const { settings, setSettings, isFileRead } = useDataContext();

  useEffect(() => {
    setSettings(new Settings({ ...settings, isFirstLaunch: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isFileRead) return <SplashScreen />;
  if (settings.isFirstLaunch) {
    return <OnBoardingScreen />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="addItemModal"
        options={{ headerTitle: "Add Item", presentation: "modal" }}
      />
      <Stack.Screen
        name="editItemModal"
        options={{ headerTitle: "Edit Item", presentation: "modal" }}
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
