import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

function TabBarIcon({ color }: { color: string }) {
  return (
    <FontAwesome
      size={28}
      style={{ marginBottom: -3 }}
      name="code"
      color={color}
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
          tabBarIcon: TabBarIcon, // TODO: Change Icon
          headerRight: () =>
            Header({ href: "/infoModal", icon: "info-circle" }),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "List",
          tabBarIcon: TabBarIcon, // TODO Change Icon
          headerRight: () =>
            Header({ href: "/addItemModal", icon: "plus-circle" }),
        }}
      />
    </Tabs>
  );
}
