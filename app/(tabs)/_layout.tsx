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

function HeaderRight1() {
  return (
    <Link href="/modal" asChild>
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name="info-circle"
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
          title: "Wander List",
          tabBarIcon: TabBarIcon,
          headerRight: HeaderRight1,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: TabBarIcon,
        }}
      />
    </Tabs>
  );
}
