import { router } from "expo-router";
import React, { useEffect } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import { Octicons, Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import CustomButton from "@/components/CustomButton";

const NOTCH_RADIUS = 18;

type ReceiptRow = {
  label: string;
  value: string;
  copyable?: boolean;
  multiline?: boolean;
};

const rows: ReceiptRow[] = [
  {label: "Recipient Details", value: "JOHN DOE\nFirst Bank of Nigeria | 2020362609"},
  { label: "Amount",           value: "₦5,000,000.00" },
  { label: "Naration",         value: "Personal withdraw" },
  { label: "Transaction No.",  value: "56478786768798076677069​8", copyable: true },
  { label: "Transaction Date", value: "Feb. 10th 2025   4:00 PM" },
  { label: "Session ID",       value: "436755668758658798686869​373698379", copyable: true },
];

export default function WithdrawalReceiptScreen() {
  const { top, bottom } = useSafeAreaInsets();

  const headerOpacity    = useSharedValue(0);
  const headerTranslateY = useSharedValue(40);
  const cardOpacity      = useSharedValue(0);
  const bottomOpacity    = useSharedValue(0);

  useEffect(() => {
    const easing = Easing.out(Easing.quad);
    headerOpacity.value    = withTiming(1, { duration: 400, easing });
    headerTranslateY.value = withTiming(0, { duration: 400, easing });
    cardOpacity.value      = withDelay(400, withTiming(1, { duration: 350, easing }));
    bottomOpacity.value    = withTiming(1, { duration: 400, easing });
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    opacity:   headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));
  const cardStyle   = useAnimatedStyle(() => ({ opacity: cardOpacity.value }));
  const bottomStyle = useAnimatedStyle(() => ({ opacity: bottomOpacity.value }));

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };

  return (
    <LinearGradient
      colors={["#6A11CB", "#8B3DFF", "#C0392B", "#FF5F00"]}
      locations={[0, 0.35, 0.75, 1]}
      style={{ flex: 1 }}
    >
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 20, paddingTop: top + 8 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="size-10 rounded-full bg-white/20 items-center justify-center mt-2 mb-6"
        >
          <Octicons name="chevron-left" size={22} color="white" />
        </TouchableOpacity>

        {/* Header */}
        <Animated.View style={headerStyle} className="mb-8 items-center px-2">
          <Text className="text-3xl font-psbold text-white text-center mb-3">
            Successful Withdraw!
          </Text>
          <Text className="text-sm font-pmedium text-white/90 text-center leading-6">
            Your account has been successfully credited. Thank you for being an amazing vendor. We love you❤️
          </Text>
        </Animated.View>

        {/* Receipt Card */}
        <Animated.View
          style={[
            cardStyle,
            {
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 24,
              shadowOffset: { width: 0, height: 10 },
              elevation: 10,
              borderRadius: 20,
              overflow: "hidden",
            },
          ]}
        >
          {/* Top section */}
          <View className="bg-white p-4">
            <Text className="text-base font-psbold text-black mb-4">
              Transaction Details
            </Text>

            {rows.map((row, i) => (
              <View
                key={row.label}
                className={`flex-row items-start justify-between py-3.5 ${
                  i < rows.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <Text className="text-xs font-pregular flex-shrink-0 w-32">
                  {row.label}
                </Text>
                <View className="flex-row items-center gap-2 flex-1 justify-end">
                  <Text
                    className="text-xs font-pmedium text-right flex-shrink"
                    numberOfLines={2}
                  >
                    {row.value}
                  </Text>
                  {row.copyable && (
                    <Pressable
                      onPress={() => copyToClipboard(row.value)}
                      hitSlop={8}
                    >
                      <Feather name="copy" size={12} color="#9ca3af" />
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Perforated divider — notches use gradient colour to blend */}
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
                backgroundColor: "#C0392B",
              }}
            />
            <View
              className="flex-1"
              style={{
                borderStyle: "dashed",
                borderWidth: 0.5,
                borderColor: "#d1d5db",
              }}
            />
            <View
              style={{
                width: NOTCH_RADIUS,
                height: NOTCH_RADIUS * 2,
                borderTopLeftRadius: NOTCH_RADIUS,
                borderBottomLeftRadius: NOTCH_RADIUS,
                backgroundColor: "#C0392B",
              }}
            />
          </View>

          {/* Bottom stub — Download & Share */}
          <View className="bg-white px-5 pt-5 pb-6">
            <View className="flex-row gap-3">
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-1 flex-row items-center justify-center gap-1 border border-gray-300 rounded-full py-3"
              >
                <Feather name="download" size={16} color="#1a1a1a" />
                <Text className="text-sm font-psbold text-black">Download</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-1 flex-row items-center justify-center gap-1 border border-gray-300 rounded-full py-3"
              >
                <Feather name="share" size={16} color="#1a1a1a" />
                <Text className="text-sm font-psbold text-black">Share Receipt</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Return to Homepage — fixed bottom */}
      <Animated.View
        style={[bottomStyle, { marginBottom: bottom }]}
        className="px-4 pb-2"
      >
        <CustomButton
          title="Return to Homepage"
          handlePress={() => router.replace("/(vendor)/(protected)/(tabs)/Home")}
          containerStyles="w-full border border-white"
          bgColor="transparent"
          textStyles="text-white"
        />
      </Animated.View>
    </LinearGradient>
  );
}