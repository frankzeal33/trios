import CustomButton from "@/components/CustomButton";
import ImageDetailCarousel from "@/components/ImageDetailCarousel";
import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialCommunityIcons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
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
import MapView, { Marker } from 'react-native-maps';
import Stars from "react-native-stars";
import * as Calendar from 'expo-calendar';
import { useToast } from 'react-native-toast-notifications';
import { Linking } from 'react-native';
import IconButton from "@/components/IconButton";
import CustomButtomSheet from "@/components/CustomButtomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

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
  const bottomSheetReviewModalRef = useRef<BottomSheetModal>(null);
  const [quantity, setQuantity] = useState(1)

  const handlePresentReviewModalPress = useCallback(() => {
      bottomSheetReviewModalRef.current?.present();
    }, []);
  
    const handleCloseReviewModalPress = useCallback(() => {
      bottomSheetReviewModalRef.current?.dismiss()
    }, []);

  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1.2, { duration: 800 }),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: interpolate(pulse.value, [1, 1.2], [1, 0.8]),
  }));
  
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

  const requestPermission = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    return status === 'granted';
  };

  const addToCalendar = async () => {
    try {
      const hasPermission = await requestPermission();
      if (!hasPermission) return;

      const result = await Calendar.createEventInCalendarAsync(
        {
          title: "Taco Tuesdays at Paradis Lagos",
          location: "Paradis Lagos, beside Enyo Filling Station",
          startDate: new Date("2026-04-21T19:34:00"),
          endDate: new Date("2026-04-21T22:00:00"),
          notes: "Every Tuesday comes with flavour and fire 🔥",
        }
      );

    } catch (error) {
      
      toast.show("Unable to add event to calender", {
        type: "error",
      });
    }
  };

  const openDirections = async () => {
    const lat = 6.5244;
    const lng = 3.3792;
    const address = "Ozumba Mbadiwe Road, VI, Lagos";
    
    const primary = `comgooglemaps://?daddr=${lat},${lng}&q=${encodeURIComponent(address)}`;
    const fallbackLatLng = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    const fallbackAddress = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

    const canOpen = await Linking.canOpenURL(primary);

    if (canOpen) {
      Linking.openURL(primary);
    } else {
      if(lat && lng){
        Linking.openURL(fallbackLatLng);
      } else {
        Linking.openURL(fallbackAddress);
      }
    }
  };

  const pay = () => {
    handleCloseReviewModalPress()
    router.push("/(user)/(protected)/(routes)/BookingReceipt")
  }

  const shareLink = async () => {

    const url = "https://trios.com"

    const result = await Share.share(
      {
        message: `Check out this event on trios 🚀\nDJ Jimmy Jat House show.\n${url}`,
        title: 'Start from trios app today!',
        // url: url,
      },
      {
        dialogTitle: 'trios events',
      }
    );

  };

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

        <View className="flex-row items-center gap-3">
          <Pressable  className="w-10 h-10 rounded-full bg-black/30 items-center justify-center">
            <Ionicons name="heart-outline" size={20} color="white" />
          </Pressable>
          <Pressable  className="w-10 h-10 rounded-full bg-black/30 items-center justify-center" onPress={shareLink}>
            <Ionicons name="share-social-outline" size={22} color="white" />
          </Pressable>
        </View>
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
          <View className="bg-emerald-900 self-start px-3 py-1 rounded-md mb-3">
            <Text className="text-white text-[10px] font-bold uppercase tracking-wider">Music</Text>
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

            <View className="flex-row items-center mt-3">
                <FontAwesome
                    name={"star"}
                    size={18}
                    color={"#FFA41C"}
                />
              <Text className="ml-2 font-plight">4.5  •  100 Reviews</Text>
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

          {/* HOST SECTION */}
          <Pressable 
            className="justify-between w-full flex-row items-center bg-white my-4 py-3"
          >
            {/* Left side (icon + text) */}
            <View className="flex-1 w-full flex-row items-center gap-2">

                <View>
                    <Image 
                        source={{ uri: 'https://i.pravatar.cc/150?u=yung' }} 
                        className="w-12 h-12 rounded-full bg-gray-200"
                        resizeMode="cover" 
                    />
                </View>
                
                {/* Title + description */}
                <View className="flex-1 flex-col">
                    <View>
                        <Text 
                            className={`font-plight text-xs`} 
                            numberOfLines={1}
                        >
                            Hosted by
                        </Text>
                        <Text 
                            className="font-psbold flex-1"
                            numberOfLines={1}
                        >
                            Yung Sin-Ga
                        </Text>
                    </View>

                </View>
            </View>

            <Entypo name="chevron-small-right" size={32} color="#000" />
        </Pressable>

        <View style={styles.container}>
          <MapView
            style={styles.map}
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
            initialRegion={{
              latitude: 6.5244,     // Lagos example
              longitude: 3.3792,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: 6.5244,
                longitude: 3.3792,
              }}
              title="Ozumba Mbadiwe Road, Opposite 1004, Victoria Island, Lagos"
            />
          </MapView>

          {/* OVERLAY BUTTON */}
          <TouchableOpacity
            onPress={openDirections}
            className="absolute top-3 right-3 flex-row items-center gap-2 bg-black/60 px-3 py-2 rounded-full"
          >
            <MaterialCommunityIcons name="navigation" size={16} color="white" />

            <Text className="text-white text-xs font-pmedium">
              Directions
            </Text>

            {/* LIVE BADGE */}
            <Animated.View
              style={pulseStyle}
              className="bg-red-600 px-2 py-[2px] rounded-full ml-1"
            >
              <Text className="text-[10px] text-white font-bold">
                LIVE
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View className="mt-6">
          <Text className="font-psbold">Reviews</Text>
          <View
            className="justify-between w-full flex-row items-center bg-white my-3"
          >
              <View className="flex-1 w-full flex-row items-center gap-2">

                  <View>
                    <Image 
                      source={{ uri: 'https://i.pravatar.cc/150?u=yung' }} 
                      className="w-12 h-12 rounded-full bg-gray-200"
                      resizeMode="cover" 
                    />
                  </View>
                  
                  {/* Title + description */}
                  <View className="flex-1 flex-col">
                      <View>
                          <Text 
                            className="font-psbold text-blue flex-1"
                            numberOfLines={1}
                          >
                            Ojiego Franklin
                          </Text>
                          <Text 
                            className={`font-plight text-xs`} 
                            numberOfLines={1}
                          >
                            Bayelsa
                          </Text>
                      </View>

                  </View>
              </View>
          </View>
          <View>
            <View className='items-center justify-start flex-row gap-2'>
              <Stars
                display={4.5}
                spacing={2}
                count={5}
                starSize={14}
                fullStar= {<FontAwesome name="star" size={14} color="#FFA41C" />}
                emptyStar= {<FontAwesome name="star-o" size={14} color="#D5DBDB" />}
                halfStar={<FontAwesome name="star-half-o" size={14} color="#FFA41C" />}
              />
              <Text numberOfLines={1} className="font-pregular text-xs">•  1 month ago</Text>
            </View>
            <Text className="font-plight text-sm leading-6 mt-1">
              Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
              dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, 
              risus sem sollicitudin lacus, ut interdum.
            </Text>
          </View>
          <Pressable className="bg-gray-200 py-4 rounded-2xl items-center my-4">
            <Text className="text-black font-psbold">See all Reviews</Text>
          </Pressable>
        </View>

        <View>
          <View className='flex-row items-center justify-center gap-3'>
            <IconButton title='Save to Calendar' textStyles='text-black' icon={<Ionicons name="calendar-outline" size={15} color="black" />} containerStyles='bg-white border border-purple flex-1' handlePress={addToCalendar}/>
            <IconButton title='Open in Map' textStyles='text-black' icon={<Ionicons name="location-outline" size={15} color="#000" />} containerStyles='bg-white border border-purple flex-1' handlePress={openDirections}/>
          </View>
        </View>

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
            <Text className="text-2xl font-extrabold text-black">{displayCurrency(Number(15000))}</Text>
          
            <Pressable 
                className="bg-purple px-6 py-3 rounded-2xl"
                onPress={handlePresentReviewModalPress}
            >
                <Text className="text-white font-psbold text-lg">Book Now</Text>
            </Pressable>
        </View>
      </Animated.View>

      <CustomButtomSheet ref={bottomSheetReviewModalRef} enablePenDown={false}>
        <View>
          <View className='flex-row w-full items-center justify-between gap-1'>
            <Text className="text-2xl font-psbold text-center">Review Booking</Text>
            <TouchableOpacity onPress={handleCloseReviewModalPress}>
              <SimpleLineIcons name="close" size={28} color="#000" />
            </TouchableOpacity>
          </View>
          <View className='my-2'>
            
            <Text className="text-xl font-psbold text-black mb-3 mt-4" numberOfLines={3}>
              DJ Jimmy Jat House show
            </Text>

            {/* Event Details List */}
            <View className="space-y-4 mb-4">
              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={14} color="#000" />
                <Text className="ml-2 font-pLight text-sm">Feb. 14th  •  9:00pm - 12:00am</Text>
              </View>

              <View className="flex-row items-start mt-3">
                <Ionicons name="location-outline" size={16} color="#000" />
                <Text className="ml-2 flex-1 font-plight leading-5 text-sm" numberOfLines={3}>
                  Ozumba Mbadiwe Road, Opposite 1004, Victoria Island, Lagos
                </Text>
              </View>

              <View className="flex-row items-end mt-3">
                <Text className="text-xl font-psbold text-black">
                  {displayCurrency(Number(15000))}
                </Text>
                <Text className="ml-2 mb-0.5 font-plight leading-5 text-xs">
                  per ticket
                </Text>
              </View>

              <View className="flex-row items-center justify-between my-6">
                <Text className="font-plight leading-5 text-xs">
                  Tickets
                </Text>
                <View className={`flex-row items-center justify-between h-9 rounded-full border border-gray`}>
                  <Pressable disabled={quantity === 1} onPress={() => setQuantity(prev => Math.max(1, prev - 1))} className={`bg-gray px-3 h-full rounded-l-full items-center justify-center ${quantity === 1 ? "opacity-50" : "opacity-100"}`}>
                    <AntDesign name="minus" size={16} color="#003366" />
                  </Pressable>
                  <View className='px-2 min-w-12 items-center justify-center'>
                    <Text className='text-blue font-amedium text-base'>{quantity}</Text>
                  </View>
                  <Pressable onPress={() => setQuantity(prev => prev + 1)} className="bg-gray px-3 h-full rounded-r-full items-center justify-center">
                    <AntDesign name="plus" size={16} color="#003366" />
                  </Pressable>
                </View>
              </View>

              <View className="flex-row items-center justify-between gap-2 mt-3">
                <Text className="font-plight leading-5 text-sm">
                  Total Cost:
                </Text>
                <Text className="text-2xl font-psbold text-black">
                  {displayCurrency(Number(quantity * 15000))}
                </Text>
              </View>

            </View>
          </View>
          <CustomButton title="Proceed to Pay" handlePress={pay} containerStyles="w-full" textStyles='text-white' />
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
