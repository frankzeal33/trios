import { View, Text, FlatList, Pressable, Dimensions, TouchableOpacity, Image } from 'react-native'
// import { Image } from 'expo-image';
const width = Dimensions.get("window").width

type Props = {
  title: string
  data: any[]
  onViewAll?: () => void
}

const getCTA = (category: string) => {
  if (category === "Hotel" || category === "AirBnB") return "Book Now";
  if (category === "Event") return "View Now";
  if (category === "Nightlife") return "RSVP";
  if (category === "Restaurant" || category === "Grills" || category === "Traditional") return "Order Now";
  return "View Now";
};

const ShortCategoryCard = ({ title, data, onViewAll }: Props) => {

    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


    const renderEvents = ({ item }: any) => (
        <Pressable className="h-[140px] w-60 rounded-3xl overflow-hidden">

            {/* IMAGE (cached) */}
            <Image
                source={{ uri: item?.image }}
                // placeholder={{ blurhash }}
                className="absolute inset-0 w-full h-full"
                // contentFit="cover"
                // cachePolicy="disk"
            />

            {/* DARK OVERLAY */}
            <View className="absolute inset-0 bg-black/30" />

            {/* CONTENT */}
            <View className="flex-1 justify-between p-4">
            
                {/* Title */}
                <Text className="text-white text-sm font-semibold" numberOfLines={3}>
                    {item?.title}
                </Text>

                {/* Button */}
                <TouchableOpacity className="bg-yellow-700 self-start px-3 py-2 rounded-lg">
                    <Text className="text-white text-sm font-medium">
                        {getCTA(item?.category)}
                    </Text>
                </TouchableOpacity>

            </View>
        </Pressable>
    );

  return (
    <View className='py-2'>
        <View className='w-full px-3 pb-1 flex-row items-center justify-between gap-1'>
            <Text className="font-psbold">{title}</Text>
            <TouchableOpacity onPress={onViewAll}>
                <Text className="font-pmedium text-sm">View all</Text>
            </TouchableOpacity>
       </View>
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            keyExtractor={(item, index) => item?.id.toString()}
            ItemSeparatorComponent={() => <View className="w-3" />}
            renderItem={renderEvents}
            scrollEnabled={true}
            nestedScrollEnabled
            ListEmptyComponent={() => (
                <View className="items-center justify-center px-2 py-8 bg-gray-50 rounded-md" style={{width: width - 24}}>
                    <Text className="text-xl font-extrabold">
                        No food joints found
                    </Text>
                    <Text className="text-sm text-center mt-1">
                        Food joints will show here.
                    </Text>
                </View>
            )}
        />
    </View>
  )
}

export default ShortCategoryCard