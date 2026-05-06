import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import CustomButton from "@/components/CustomButton";
import { Octicons } from "@expo/vector-icons";

const NOTCH_RADIUS = 18;

export default function UnsuccessfulReceiptScreen() {

  const { top, bottom } = useSafeAreaInsets()
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(40);
  const cardOpacity = useSharedValue(0);
  const bottomOpacity = useSharedValue(0);

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
    <View className="flex-1 bg-[#F9DEDE]">
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 20, paddingTop: top + 8}}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="size-10 rounded-full bg-white/40 items-center justify-center mt-2 mb-6"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          <Octicons name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        {/* Header */}
        <Animated.View style={headerStyle} className="mb-6 items-center">
          <Text className="text-2xl font-psbold leading-9 mb-2 text-center">
            Ticket booking unsuccessful
          </Text>
          <Text className="text-base leading-6 text-center px-4">
            Something went wrong and your ticket could not be booked at this time.
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
            <Text className="text-red-600 font-bold text-sm tracking-wide mb-2.5">
              Unsuccessful
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
                backgroundColor: "#F9DEDE",
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
                backgroundColor: "#F9DEDE",
              }}
            />
          </View>

          {/* Bottom stub — Toggle between QR and Barcode */}
          <View className="bg-white p-4 items-center h-36"/>
          
        </Animated.View>
      </ScrollView>

      {/* Return to Homepage — fixed bottom */}
      <Animated.View
        style={[bottomStyle, { marginBottom: bottom }]}
        className="px-4"
      >
        <CustomButton title="Try Again" handlePress={() => router.back()} containerStyles="w-full mt-4 border border-black" bgColor="transparent" textStyles='text-black'/>
      </Animated.View>
    </View>
  );
}