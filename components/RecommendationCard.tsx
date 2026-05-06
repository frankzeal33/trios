import { FontAwesome, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from "react-native-reanimated";
import { useEffect, useState, useRef } from "react";
import { router } from "expo-router";
import { scheduleOnRN } from "react-native-worklets";

const categoryColors: any = {
  Relaxation: "#92400E",
  Party: "#9D174D",
  Music: "#6B21A8",
  Food: "#14532D",
};

const events = [
  {
    id: 1,
    title: "Eko Hotel",
    category: "Relaxation",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    date: "Feb. 14th",
    time: "9:00pm - 12:00am",
    location: "Victoria Island, Lagos",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Beach Party",
    category: "Party",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    date: "Feb. 20th",
    time: "6:00pm - 11:00pm",
    location: "Lekki Beach",
    rating: 0.7,
  },
  {
    id: 3,
    title: "Live Concert",
    category: "Music",
    image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=800",
    date: "Mar. 2nd",
    time: "7:00pm - 1:00am",
    location: "Tafawa Balewa Square",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Food Festival",
    category: "Food",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    date: "Mar. 10th",
    time: "12:00pm - 8:00pm",
    location: "Freedom Park",
    rating: 4.6,
  },
];

export default function RecommendationCard() {
  const progress = useSharedValue(0);
  const isAnimating = useRef(false);
  const slotFlipRef = useRef(false);
  const indexRef = useRef(0);

  const [slotA, setSlotA] = useState(events[0]);
  const [slotB, setSlotB] = useState(events[1]);

  const onAnimationComplete = () => {
    const nextIndex = (indexRef.current + 1) % events.length;
    const afterNextIndex = (indexRef.current + 2) % events.length;

    slotFlipRef.current = !slotFlipRef.current;
    indexRef.current = nextIndex;

    if (slotFlipRef.current) {
      // slotB is now visible, preload next into slotA (hidden)
      setSlotA(events[afterNextIndex]);
    } else {
      // slotA is now visible, preload next into slotB (hidden)
      setSlotB(events[afterNextIndex]);
    }

    isAnimating.current = false;
  };

  const triggerNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const toValue = slotFlipRef.current ? 0 : 1;

    progress.value = withTiming(
      toValue,
      { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) },
      (finished) => {
        "worklet";
        if (finished) {
          scheduleOnRN(onAnimationComplete);
        }
      }
    );
  };

  const triggerNextRef = useRef(triggerNext);
  useEffect(() => {
    triggerNextRef.current = triggerNext;
  });

  useEffect(() => {
    const interval = setInterval(() => triggerNextRef.current(), 4000);
    return () => clearInterval(interval);
  }, []);

  const slotAStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }));

  const slotBStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  return (
    <View className="mx-2 my-2">
      <View className="px-2 flex-row items-center gap-1 justify-between">
        <Text className="font-psbold">Recommendations</Text>
        <TouchableOpacity>
          <Text className="font-pmedium text-sm">Refresh</Text>
        </TouchableOpacity>
      </View>
      <View className="bg-black rounded-2xl pb-[1px]">
        <View className="p-2 bg-white rounded-2xl -mt-0.5">
          <View className="relative overflow-hidden w-full rounded-3xl bg-gray-200 h-[200px]">
            {/* SLOT B */}
            <Animated.View style={[StyleSheet.absoluteFill, slotBStyle]}>
              <Image
                source={{ uri: slotB.image }}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
                transition={0}
              />
            </Animated.View>

            {/* SLOT A */}
            <Animated.View style={[StyleSheet.absoluteFill, slotAStyle]}>
              <Image
                source={{ uri: slotA.image }}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
                transition={0}
              />
            </Animated.View>

            <View className="absolute bottom-3 right-3 bg-black/50 rounded-full p-2">
              <FontAwesome name="heart" size={18} color="#fff" />
            </View>
          </View>

          <View className="mt-2 min-h-[120px] pb-1 relative">
            {/* SLOT B text */}
            <Animated.View
              style={[StyleSheet.absoluteFill, slotBStyle]}
              pointerEvents="none"
            >
              <EventText item={slotB} />
            </Animated.View>

            {/* SLOT A text */}
            <Animated.View style={slotAStyle}>
              <EventText item={slotA} />
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
  );
}

const EventText = ({ item }: { item: any }) => (
  <View>
    <Text className="text-[16px] font-psbold" numberOfLines={1}>
      {item.title}
    </Text>
    <View
      className="px-3 py-1 rounded-md self-start mt-1"
      style={{ backgroundColor: categoryColors[item.category] || "#6B7280" }}
    >
      <Text className="text-white text-xs" numberOfLines={1}>
        {item.category}
      </Text>
    </View>
    <View className="mt-2 flex-row items-center gap-1">
      <Ionicons name="calendar-clear-outline" size={14} color="black" />
      <Text className="text-sm flex-1" numberOfLines={1}>
        {item.date} • {item.time}
      </Text>
    </View>
    <View className="mt-2 flex-row items-center gap-1">
      <SimpleLineIcons name="location-pin" size={14} color="black" />
      <Text className="text-sm flex-1" numberOfLines={1}>
        {item.location}
      </Text>
    </View>
    <View className="flex-row items-center justify-between pt-2">
      <View className="items-center justify-start flex-row gap-1">
        <FontAwesome
          name={
            item.rating >= 1
              ? "star"
              : item.rating >= 0.5
              ? "star-half-o"
              : "star-o"
          }
          size={16}
          color={item.rating >= 0.5 ? "#FFA41C" : "#D5DBDB"}
        />
        <Text numberOfLines={1} className="font-pregular text-sm">
          {item.rating}
        </Text>
      </View>
      <TouchableOpacity
        className="bg-purple px-4 py-2 min-h-[32px] justify-center items-center rounded-lg"
        onPress={() =>
          router.push("/(user)/(protected)/(routes)/EventDetails")
        }
      >
        <Text className="text-white text-xs font-pmedium">View Details</Text>
      </TouchableOpacity>
    </View>
  </View>
);