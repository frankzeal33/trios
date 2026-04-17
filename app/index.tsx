import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return <Redirect href={isAuthenticated ? "/(vendor)/(protected)/(tabs)/Home" : "/Splash"} />;
}
