import CustomButton from "@/components/CustomButton";
import ImageDetailCarousel from "@/components/ImageDetailCarousel";
import { Entypo, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Image, Pressable, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import displayCurrency from '@/utils/displayCurrency';
import * as Calendar from 'expo-calendar';
import { useToast } from 'react-native-toast-notifications';
import { Linking } from 'react-native';
import CustomButtomSheet from "@/components/CustomButtomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SmallCustomButton from "@/components/SmallCustomButton";
import RadioGroup from "@/components/RadioGroup";
import { data } from "@/constants";

const { width } = Dimensions.get("window");
const HEADER_HEIGHT = 450;

const carouselImages = [
  "https://res.cloudinary.com/frankzeal/image/upload/v1772372180/1131w-LZtBbF-igKQ_f4e4ln.png",
  "https://res.cloudinary.com/frankzeal/image/upload/v1772372183/Brown_And_Black_Bold_Food_Catering_Flyer_axjlu0.png",
  "https://res.cloudinary.com/frankzeal/image/upload/v1772372185/Black_and_Orange_Basketball_Tournament_Flyer_A4_khw0ng.png",
];

export default function EventDetailsScreen() {

  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const showBottomBar = useSharedValue(1);
  const lastScrollY = useSharedValue(0);
  const toast = useToast();
  const [bottomBarHeight, setBottomBarHeight] = useState(0);
  const bottomSheetCancelModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetStatusModalRef = useRef<BottomSheetModal>(null);
  const [status, setStatus] = useState("active")

  const handlePresentCancelModalPress = useCallback(() => {
    bottomSheetCancelModalRef.current?.present();
  }, []);

  const handleCloseCancelModalPress = useCallback(() => {
    bottomSheetCancelModalRef.current?.dismiss()
  }, []);

  const handlePresentStatusModalPress = useCallback(() => {
    bottomSheetStatusModalRef.current?.present();
  }, []);

  const handleCloseStatusModalPress = useCallback(() => {
    bottomSheetStatusModalRef.current?.dismiss()
  }, []);

  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1.2, { duration: 800 }),
      -1,
      true
    );
  }, []);
  
   const scrollHandler = useAnimatedScrollHandler((event) => {
    const currentOffset = event.contentOffset.y;
    const contentHeight = event.contentSize.height;
    const layoutHeight = event.layoutMeasurement.height;

    const isAtBottom = layoutHeight + currentOffset >= contentHeight - 100;

    if (isAtBottom) {
      showBottomBar.value = withTiming(1);
    } else {
      if (currentOffset > lastScrollY.value && currentOffset > 50) {
        showBottomBar.value = withTiming(0);
      } else if (currentOffset < lastScrollY.value) {
        showBottomBar.value = withTiming(1);
      }
    }

    lastScrollY.value = currentOffset;
    scrollY.value = currentOffset;
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollY.value,
            [-HEADER_HEIGHT, 0],
            [2, 1],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

    const iconAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT / 2],
            [1, 0],
            Extrapolation.CLAMP,
        );

        const translateY = interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT / 2],
            [0, -20],
            Extrapolation.CLAMP,
        );

        return {
            opacity,
            transform: [{ translateY }],
        };
    });

  const bottomBarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: interpolate(showBottomBar.value, [0, 1], [100, 0]) }],
      opacity: showBottomBar.value,
    };
  });

  const openStatus = () => {
    handlePresentStatusModalPress()
  }

  const cancel = () => {
    handleCloseCancelModalPress()
    router.push("/(vendor)/(protected)/(routes)/CancelEventReg")
  }

  const updateStatus = () => {
    handleCloseStatusModalPress()
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />

        {/* TOP ICONS */}
      <Animated.View
        className="absolute left-5 right-5 z-50 flex-row justify-between items-center"
        style={[
          iconAnimatedStyle,
          { top: insets.top + 10 },
        ]}
      >
        <Pressable className="w-10 h-10 rounded-full bg-black/30 items-center justify-center" onPress={() => router.back()}>
          <Octicons name="chevron-left" size={24} color="white" />
        </Pressable>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomBarHeight + 40 }}
        
      >
        {/* HERO IMAGE SECTION */}
        <Animated.View style={[styles.header, headerStyle]}>
          <ImageDetailCarousel images={carouselImages} />
        </Animated.View>

        {/* CONTENT CARD (The "Overlap" Effect) */}
        <View style={styles.contentContainer}>
          {/* Category Tag */}
          <View className="flex-row gap-2 items-center justify-between mb-3">
            <View className="bg-emerald-900 self-start px-3 py-1 rounded-md">
              <Text className="text-white text-[10px] font-bold uppercase tracking-wider">Music</Text>
            </View>
            <Pressable onPress={() => router.push("/(vendor)/(protected)/(routes)/EditEvent")}>
              <Feather name="edit" size={20} color="black" />
            </Pressable>
          </View>

          <Text className="text-2xl font-pbold text-black mb-3">
            DJ Jimmy Jat House show
          </Text>

          {/* Event Details List */}
          <View className="space-y-4 mb-4">
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={18} color="#000" />
              <Text className="ml-2 font-pLight">Feb. 14th  •  9:00pm - 12:00am</Text>
            </View>

            <View className="flex-row items-start mt-3">
              <Ionicons name="location-outline" size={20} color="#000" />
              <Text className="ml-2 flex-1 font-plight leading-5">
                Ozumba Mbadiwe Road, Opposite 1004, Victoria Island, Lagos
              </Text>
            </View>

            <View className='flex-row gap-4 items-center mt-3'>
              <View className="items-center justify-start flex-row gap-1">
                  <SimpleLineIcons name="eye" size={16} color="black" />
                  <Text numberOfLines={1} className="font-pregular text-sm">
                      2k
                  </Text>
              </View>
              <View className="items-center justify-start flex-row gap-1">
                  <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="black" />
                  <Text numberOfLines={1} className="font-pregular text-sm">
                      500
                  </Text>
              </View>
              <View className="items-center justify-start flex-row gap-1">
                  <Ionicons name="heart-outline" size={15} color="black" />
                  <Text numberOfLines={1} className="font-pregular text-sm">
                      250
                  </Text>
              </View>
            </View>

             <View className="flex-row items-end mt-3">
                <Text className="text-xl font-psbold text-black">
                  {displayCurrency(Number(15000))}
                </Text>
                <Text className="ml-2 mb-0.5 font-plight leading-5 text-xs">
                  per ticket
                </Text>
              </View>
          </View>

          <Text className="font-plight leading-6">
            Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
            dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, 
            risus sem sollicitudin lacus, ut interdum. Sed dignissim, metus nec fringilla accumsan, 
            risus sem sollicitudin lacus, ut interdum.
          </Text>

          <Pressable className="bg-gray-200 py-4 rounded-2xl items-center mt-6">
            <Text className="text-black font-psbold">Read more</Text>
          </Pressable>

          <Pressable className="bg-gray-200 py-4 rounded-2xl items-center mt-6" onPress={() => router.push("/(vendor)/(protected)/(routes)/HoldEventReg")}>
            <Text className="text-black font-psbold">Hold registration</Text>
          </Pressable>

          <Pressable 
            className="justify-between w-full flex-row items-center bg-white my-6"
            onPress={() => router.push("/(vendor)/(protected)/(routes)/BookingList")}
          >
            <View className="flex-1 w-full flex-row items-center gap-2">
              <View>
                  <Text 
                    className="font-psbold text-blue flex-1"
                    numberOfLines={1}
                  >
                    List of bookings
                  </Text>
                  <Text 
                    className={`font-plight text-xs`} 
                    numberOfLines={1}
                  >
                    2k tickeks purchased
                  </Text>
              </View>
            </View>

            <Entypo name="chevron-small-right" size={32} color="#000" />
          </Pressable>

          <Pressable 
            className="justify-between w-full flex-row items-center bg-white my-2"
          >
            <View className="flex-1 w-full flex-row items-center gap-2">
              <View>
                  <Text 
                    className="font-psbold text-blue flex-1"
                    numberOfLines={1}
                  >
                    Event status
                  </Text>
                  <Text 
                    className={`font-plight text-xs`} 
                    numberOfLines={1}
                  >
                    Active
                  </Text>
              </View>
            </View>

            <SmallCustomButton title="Change" containerStyles='self-center' handlePress={openStatus}/>
          </Pressable>

          <Pressable 
            className="justify-between w-full flex-row items-center bg-white my-4"
            onPress={() => router.push("/(vendor)/(protected)/(routes)/Review")}
          >
            <View className="flex-1 w-full flex-row items-center gap-2">
              <View>
                <Text 
                  className="font-psbold text-blue flex-1"
                  numberOfLines={1}
                >
                  View ratings
                </Text>
                <Text 
                  className={`font-plight text-xs`} 
                  numberOfLines={1}
                >
                  100 rating
                </Text>
              </View>
            </View>

            <Entypo name="chevron-small-right" size={32} color="#000" />
          </Pressable>

        </View>
      </Animated.ScrollView>

      {/* STICKY BOTTOM BAR */}
      <Animated.View 
        onLayout={(e) => {
          setBottomBarHeight(e.nativeEvent.layout.height);
        }}
        style={[
          styles.bottomBar, 
          { paddingBottom: insets.bottom },
          bottomBarStyle
        ]}
      >
        <View className="flex-row items-center justify-between px-4 pb-2 pt-4 gap-2">
          <Pressable 
            className="bg-red-600 px-6 py-3 rounded-2xl w-full items-center justify-center"
            onPress={handlePresentCancelModalPress}
          >
            <Text className="text-white font-psbold text-lg">Cancel event</Text>
          </Pressable>
        </View>
      </Animated.View>

      <CustomButtomSheet ref={bottomSheetStatusModalRef} enablePenDown={false}>
        <View>
          <View className='flex-row w-full items-center justify-between gap-1'>
            <View className="w-7"/>
            <TouchableOpacity onPress={handleCloseStatusModalPress}>
              <SimpleLineIcons name="close" size={28} color="#000" />
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-2xl font-psbold text-black text-center" numberOfLines={3}>
              Update Status
            </Text>
            <View className="mb-8">
              <RadioGroup
                title="This action will update your event"
                options={data.bookingStatus}
                selectedValue={status}
                onChange={setStatus}
                containerStyles="mt-4"
              />
            </View>
          </View>
          <CustomButton title="Update status" handlePress={updateStatus} containerStyles="w-full" textStyles='text-white' />
        </View>
      </CustomButtomSheet>

      <CustomButtomSheet ref={bottomSheetCancelModalRef} enablePenDown={false}>
        <View>
          <View className='flex-row w-full items-center justify-between gap-1'>
            <View className="w-7"/>
            <TouchableOpacity onPress={handleCloseCancelModalPress}>
              <SimpleLineIcons name="close" size={28} color="#000" />
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-2xl font-psbold text-black text-center" numberOfLines={3}>
              Cancel Event 
            </Text>

            <View className='my-2 items-center justify-center'>
              <MaterialIcons name="cancel" size={80} color="#DB1616" />
            </View>
            <Text className="font-mmedium mb-2">This event have active registrations. Canceling will notify all attendees and may require refunds.</Text>
            <Text className="font-mmedium mb-8">
              <Text className='text-orange'>Note,</Text> 50 attendees had already registered for your events.
            </Text>
          </View>
          <CustomButton title="Continue" handlePress={cancel} containerStyles="w-full" textStyles='text-white' />
        </View>
      </CustomButtomSheet>
        
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    width: width,
  },
  contentContainer: {
    backgroundColor: 'white',
    marginTop: -20, // This creates the overlap on the image
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
  },
  container: { 
    height: 250, 
    borderRadius: 16, 
    overflow: 'hidden' 
  },
  map: { ...StyleSheet.absoluteFill },
});
