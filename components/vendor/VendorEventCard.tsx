import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { EvilIcons, FontAwesome, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image } from 'expo-image';

const categoryColors: any = {
  Relaxation: "#92400E",
  Party: "#9D174D",
  Music: "#6B21A8",
  Food: "#14532D",
};

const VendorEventCard = ({item, handlePress, index, containerStyle }: {item: any; handlePress: () => void, index: number, containerStyle: string}) => {
  return (
    <View className={containerStyle}>
        <View className="w-full">
            <Pressable onPress={handlePress} className="relative overflow-hidden w-full rounded-3xl bg-gray-200 h-[200px]">

                <Image
                    source={{ uri: item?.image }}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                    transition={0}
                />
    
                <View
                    className={`px-3 py-1 rounded-lg self-start absolute top-3 right-3 ${item?.status === "active" ? "bg-green-600" : "bg-red-600"}`}
                >
                    <Text className="text-white text-sm font-pmedium capitalize">
                        {item?.status}
                    </Text>
                </View>
            </Pressable>
            <View className='mt-2'>
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
                <View className='border-b my-2 border-gray'/>
                <View className="flex-row items-center justify-between">
                    <View className='flex-row gap-4 items-center'>
                        <View className="items-center justify-start flex-row gap-1">
                            <SimpleLineIcons name="eye" size={16} color="black" />
                            <Text numberOfLines={1} className="font-pregular text-sm">
                                {item?.views}k
                            </Text>
                        </View>
                        <View className="items-center justify-start flex-row gap-1">
                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="black" />
                            <Text numberOfLines={1} className="font-pregular text-sm">
                                {item?.tickets}
                            </Text>
                        </View>
                        <View className="items-center justify-start flex-row gap-1">
                            <Ionicons name="heart-outline" size={15} color="black" />
                            <Text numberOfLines={1} className="font-pregular text-sm">
                                {item?.likes}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        className="px-5 py-2 min-h-[20px] justify-center items-center rounded-lg bg-gray-button"
                        onPress={handlePress}
                    >
                        <Text className="text-black text-xs font-pmedium">Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  )
}

export default VendorEventCard