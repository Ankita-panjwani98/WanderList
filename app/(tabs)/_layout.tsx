import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import useDataContext from "../../context/DataContext";

function TabIcon({
  name,
  color,
}: {
  name: keyof typeof FontAwesome.glyphMap;
  color: string;
}) {
  return (
    <FontAwesome
      size={30}
      style={{ marginBottom: -3 }}
      name={name}
      color={color}
    />
  );
}

// function Header({
//   href,
//   icon,
// }: {
//   href: string;
//   icon: keyof typeof FontAwesome.glyphMap;
// }) {
//   return (
//     <Link href={href} asChild>
//       <Pressable>
//         {({ pressed }) => (
//           <FontAwesome
//             name={icon}
//             size={25}
//             style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
//           />
//         )}
//       </Pressable>
//     </Link>
//   );
// }

export default function TabLayout() {
  const { settings } = useDataContext();
  const MapIcon = () =>
    TabIcon({
      name: "location-arrow",
      color: settings.isDarkModeOn ? "#ace3b8" : "green",
    });
  const ListIcon = () => TabIcon({ name: "list-ul", color: "orange" });
  const StatisticsIcon = () =>
    TabIcon({ name: "bar-chart", color: "lightblue" });
  const SettingsIcon = () =>
    TabIcon({
      name: "gear",
      color: settings.isDarkModeOn ? "#ddede0" : "gray",
    });

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: settings.isDarkModeOn ? "#617287" : "white",
        },
        tabBarLabelStyle: {
          color: settings.isDarkModeOn ? "white" : "grey",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "List",
          tabBarIcon: ListIcon,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="MapTab"
        options={{
          title: "Map",
          tabBarIcon: MapIcon,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="statisticsTab"
        options={{
          title: "Statistics",
          tabBarIcon: StatisticsIcon,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settingsTab"
        options={{
          title: "Settings",
          tabBarIcon: SettingsIcon,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
