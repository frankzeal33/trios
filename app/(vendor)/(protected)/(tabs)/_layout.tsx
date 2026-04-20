import { SpecialTabButton } from "@/components/SpecialTabButton";
import { AntDesign, FontAwesome, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
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
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          }

          if (route.name === "Listings") {
            return (
              <AntDesign
                name="unordered-list"
                size={size}
                color={color}
              />
            );
          }

          if (route.name === "AddEvents") {
            return (
              <AntDesign
                name="plus-circle"
                size={size}
                color={color} />
            );
          }

          if (route.name === "Insights") {
            return (
              <Ionicons
                name={focused ? "bar-chart" : "bar-chart-outline"}
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
      <Tabs.Screen name="Listings" options={{ title: "Listings" }} />
      <Tabs.Screen name="AddEvents"
        options={{
          title: 'Add Events',
          tabBarLabel: 'Add Events',
          tabBarButton: SpecialTabButton,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}/>
      <Tabs.Screen name="Insights" options={{ title: "Insights" }} />
      <Tabs.Screen name="Profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}