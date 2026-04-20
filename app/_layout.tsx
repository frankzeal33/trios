import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import "../global.css"
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { AntDesign, Ionicons } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontsLoaded, error] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter/Inter-Black.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter/Inter-ExtraBold.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter/Inter-SemiBold.ttf"),
    "Inter-Light": require("../assets/fonts/Inter/Inter-Light.ttf"),
    "Inter-ExtraLight": require("../assets/fonts/Inter/Inter-ExtraLight.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter/Inter-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter/Inter-Regular.ttf"),
    "Inter-Thin": require("../assets/fonts/Inter/Inter-Thin.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <ToastProvider
          placement="top"
          animationType='slide-in'
          successColor="#FFE1CC"
          dangerColor="#FFE1CC"
          warningColor="#FFE1CC"
          normalColor="#FFE1CC"
          textStyle={{ color: "#003366" }}
          offset={70}
          successIcon={<AntDesign name="check-circle" size={16} color="#003366" />}
          dangerIcon={<AntDesign name="close-circle" size={16} color="#003366" />}
          warningIcon={<Ionicons name="warning" size={16} color="#003366" />}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        </ToastProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});