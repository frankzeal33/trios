import { FontAwesome, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {

  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Octicons
                name={focused ? "home-fill" : "home"}
                size={size}
                color={color}
              />
            );
          }

          if (route.name === "Saved") {
            return (
              <MaterialCommunityIcons
                name={focused ? "bookmark-multiple" : "bookmark-multiple-outline"}
                size={size}
                color={color}
              />
            );
          }

          if (route.name === "Bookings") {
            return (
              <MaterialCommunityIcons
                name={focused ? "ticket-confirmation" : "ticket-confirmation-outline"}
                size={size}
                color={color}
              />
            );
          }

          if (route.name === "Profile") {
            return (
              <FontAwesome
                name={
                  focused ? "user" : "user-o"
                }
                size={size}
                color={color}
              />
            );
          }

          return <Ionicons name="ellipse-outline" size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6A11CB',
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#DDDDDD",
          borderTopWidth: 1,
          paddingTop: 6,
          height: 55 + insets.bottom,
          paddingBottom: insets.bottom,
          position: "relative",
          elevation: 0,
        },
      })}
    >
      <Tabs.Screen name="Home" options={{ title: "Home" }} />
      <Tabs.Screen name="Saved" options={{ title: "Saved" }} />
      <Tabs.Screen name="Bookings" options={{ title: "Bookings" }} />
      <Tabs.Screen name="Profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}