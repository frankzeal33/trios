import ProfileScreen from "@/screens/guest/profile/ProfileScreen";
import { router } from "expo-router";

export default function Profile() {
  return (
    <ProfileScreen role="Guest" title="Register as a user" onpress={() => router.push("/(user)/(auth)/Register")}/>
  )
}