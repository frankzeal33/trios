import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import { Image as ExpoImage } from 'expo-image';
import { FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const categoryColors: any = {
  Relaxation: "#92400E", // muted amber (less bright, more earthy)
  Party: "#9D174D",      // deep rose (less flashy than pink-600)
  Music: "#6B21A8",      // darker purple (richer, less neon)
  Food: "#14532D",       // deeper forest green
};

const EventCard = ({item, index}: {item: any; index: number;}) => {

    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <View className="w-full p-3 bg-purple/15 rounded-2xl overflow-hidden">
        <View className="w-full flex-row items-start">
            <Pressable className="relative w-[35%] min-h-24 bg-gray-50 items-center justify-center rounded-2xl overflow-hidden">
                <ExpoImage source={{ uri: item.image || "" }} placeholder={{ blurhash }} cachePolicy="disk" contentFit="cover" style={{ width: "100%", height: 150 }}/>
            </Pressable>
            <View className="w-full flex-1 items-start gap-1 p-2">
                <Text className="font-psbold" numberOfLines={2}>{item?.title}</Text> 
                <View className="px-3 py-1 rounded-md self-start" style={{backgroundColor: categoryColors[item.category] || "#6B7280"}}>
                    <Text className="text-white text-xs" numberOfLines={1}>{item.category}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                    <Ionicons name="calendar-clear-outline" size={12} color="black" />
                    <Text className="text-sm flex-1" numberOfLines={2}>{item.date} • {item.time}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                    <SimpleLineIcons name="location-pin" size={12} color="black" />
                    <Text className="text-sm flex-1" numberOfLines={2}>{item.location}</Text>
                </View>
                <View className="flex-row items-center justify-between w-full mt-1">
                    <View className='items-center justify-start flex-row gap-1'>
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
                        <Text numberOfLines={1} className="font-pregular text-sm">{item.rating}</Text>
                    </View>
                    <TouchableOpacity className="bg-purple px-2 py-1 min-h-[25px] justify-center items-center rounded-lg" onPress={() => router.push("/(user)/(protected)/(routes)/EventDetails")}>
                        <Text className="text-white text-xs font-pmedium">View Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  )
}

export default EventCard