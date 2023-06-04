import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Image } from "react-native";

function MapIcon() {
  return (
    <FontAwesome
      size={30}
      style={{ marginBottom: -3 }}
      name="map-marker"
      color="#68bf11"
    />
  );
}

function ListIcon() {
  return (
    <FontAwesome
      size={26}
      style={{ marginBottom: -3 }}
      name="list-ul"
      color="#177a29"
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
          tabBarIcon: MapIcon, // TODO: Change Icon
          headerRight: () =>
            Header({ href: "/infoModal", icon: "info-circle" }),
        }}
      />
      <Tabs.Screen
        name="listTab"
        options={{
          title: "List",
          tabBarIcon: ListIcon, // TODO Change Icon
          headerRight: () =>
            Header({ href: "/addItemModal", icon: "plus-circle" }),
        }}
      />
    </Tabs>
  );
}
