import ProfileScreen from "@/screens/user/profile/ProfileScreen";
import { router } from "expo-router";

export default function VendorProfileScreen() {
  return (
    <ProfileScreen role="Vendor" title="Switch to User" onpress={() => router.replace("/(user)/(protected)/(tabs)/Home")}/>
  )
}