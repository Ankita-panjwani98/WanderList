import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

function MapIcon() {
  return (
    <FontAwesome
      size={30}
      style={{ marginBottom: -3 }}
      name="location-arrow"
      color="green"
    />
  );
}

function ListIcon() {
  return (
    <FontAwesome
      size={26}
      style={{ marginBottom: -3 }}
      name="list-ul"
      color="orange"
    />
  );
}

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
          title: "Map",
          tabBarIcon: MapIcon,
        }}
      />
      <Tabs.Screen
        name="listTab"
        options={{
          title: "List",
          tabBarIcon: ListIcon,
          headerRight: () =>
            Header({ href: "/addItemModal", icon: "plus-circle" }),
        }}
      />
    </Tabs>
  );
}
