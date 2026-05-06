import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import BarcodeSection from "@/components/Barcodesection";
import QRCodeSection from "@/components/QRCodeSection";
import CustomButton from "@/components/CustomButton";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

const NOTCH_RADIUS = 18;

export default function SuccessfulReceiptScreen() {

  const { top, bottom } = useSafeAreaInsets()
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(40);
  const cardOpacity = useSharedValue(0);
  const bottomOpacity = useSharedValue(0);
  const [showQR, setShowQR] = useState(true);

  useEffect(() => {
    const easing = Easing.out(Easing.quad);

    headerOpacity.value = withTiming(1, { duration: 400, easing });
    headerTranslateY.value = withTiming(0, { duration: 400, easing });
    cardOpacity.value = withDelay(400, withTiming(1, { duration: 350, easing }));
    bottomOpacity.value = withTiming(1, { duration: 400, easing });
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
  }));

  const bottomStyle = useAnimatedStyle(() => ({
    opacity: bottomOpacity.value,
  }));

  return (
    <View className="flex-1 bg-[#3D5A3E]">
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 20, paddingTop: top + 8}}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="size-10 rounded-full bg-[#4e6e50] items-center justify-center mt-2 mb-6"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          <Octicons name="chevron-left" size={24} color="white" />
        </TouchableOpacity>

        {/* Header */}
        <Animated.View style={headerStyle} className="mb-6 items-center">
          <Text className="text-2xl font-psbold text-white leading-9 mb-2 text-center">
            Ticket successfully booked!
          </Text>
          <Text className="text-base text-white leading-6 text-center px-4">
            A confirmation email will be sent to your email address shortly.
          </Text>
        </Animated.View>

        {/* Ticket Card */}
        <Animated.View
          style={[
            cardStyle,
            {
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 20,
              shadowOffset: { width: 0, height: 8 },
              elevation: 8,
              borderRadius: 20,
              overflow: "hidden",
            },
          ]}
        >
          {/* Top half */}
          <View className="bg-white px-5 pt-5 pb-5">
            <Text className="text-green-600 font-bold text-sm tracking-wide mb-2.5">
              Confirmed
            </Text>
            <Text className="text-xl font-bold text-[#1a1a1a] mb-1.5">
              DJ Jimmy Jat House show
            </Text>
            <Text className="text-sm leading-[18px] mb-5">
              Ozumba Mbadiwe Road, Opposite 1004, Victoria Island, Lagos
            </Text>

            {/* Row 1 */}
            <View className="flex-row mb-4 gap-3">
              <View className="flex-1">
                <Text className="text-sm font-pbold mb-1">Date</Text>
                <Text className="text-[13px]">Feb. 10th 2025</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-pbold mb-1">Time</Text>
                <Text className="text-[13px]">4:00 PM</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-pbold mb-1">Hosted by</Text>
                <Text className="text-[13px]">DJ Jimmy Jat</Text>
              </View>
            </View>

            {/* Row 2 */}
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text className="text-sm font-pbold mb-1">Ticket Qty.</Text>
                <Text className="text-[13px]">1 ticket</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-pbold mb-1">Ticket Price</Text>
                <Text className="text-[13px]">₦15,000</Text>
              </View>
              <View className="flex-1" />
            </View>
          </View>

          {/* Perforated Divider */}
          <View
            className="flex-row items-center bg-white"
            style={{ height: NOTCH_RADIUS * 2 }}
          >
            <View
              style={{
                width: NOTCH_RADIUS,
                height: NOTCH_RADIUS * 2,
                borderTopRightRadius: NOTCH_RADIUS,
                borderBottomRightRadius: NOTCH_RADIUS,
                backgroundColor: "#3D5A3E",
              }}
            />
            <View
              className="flex-1"
              style={{
                borderStyle: "dashed",
                borderWidth: 0.5,
                borderColor: "#888",
              }}
            />
            <View
              style={{
                width: NOTCH_RADIUS,
                height: NOTCH_RADIUS * 2,
                borderTopLeftRadius: NOTCH_RADIUS,
                borderBottomLeftRadius: NOTCH_RADIUS,
                backgroundColor: "#3D5A3E",
              }}
            />
          </View>

          {/* Bottom stub — Toggle between QR and Barcode */}
          <View className="bg-white p-4 items-center">
            {showQR ? (
              <QRCodeSection value={"071234567890"} size={110} />
            ) : (
              <BarcodeSection
                value="071234567890"
                width={260}
                height={90}
              />
            )}

            {/* Toggle Button */}
            <TouchableOpacity
              onPress={() => setShowQR(!showQR)}
              activeOpacity={0.8}
              className="mt-6 flex-row items-center gap-2 px-3 py-2 rounded-full border border-gray-300"
            >
              <MaterialCommunityIcons name={showQR ? "barcode" : "qrcode"}  size={14} color="#3D5A3E" />
              <Text className="text-xs font-psbold text-[#3D5A3E]">
                {showQR ? "Show Barcode" : "Show QR Code"}
              </Text>
            </TouchableOpacity>
          </View>
          
        </Animated.View>
      </ScrollView>

      {/* Return to Homepage — fixed bottom */}
      <Animated.View
        style={[bottomStyle, { marginBottom: bottom }]}
        className="px-4"
      >
        <CustomButton title="Return to Homepage" handlePress={() => router.push("/(user)/(protected)/(tabs)/Home")} containerStyles="w-full mt-4 border border-white" bgColor="transparent" textStyles='text-white'/>
      </Animated.View>
    </View>
  );
}