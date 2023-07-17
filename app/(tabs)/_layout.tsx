import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

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

const MapIcon = () => TabIcon({ name: "location-arrow", color: "green" });
const ListIcon = () => TabIcon({ name: "list-ul", color: "orange" });
const StatisticsIcon = () => TabIcon({ name: "bar-chart", color: "lightblue" });
const SettingsIcon = () => TabIcon({ name: "gear", color: "gray" });

function Header({
  href,
  icon,
}: {
  href: string;
  icon: keyof typeof FontAwesome.glyphMap;
}) {
  return (
    <Link href={href} asChild>
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name={icon}
            size={25}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
}

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "List",
          tabBarIcon: ListIcon,
          headerRight: () =>
            Header({ href: "/addItemModal", icon: "plus-circle" }),
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
          headerRight: () =>
            Header({ href: "/settingsHelpModal", icon: "question-circle" }),
        }}
      />
    </Tabs>
  );
}
