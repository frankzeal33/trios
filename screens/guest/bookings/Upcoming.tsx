import { router } from 'expo-router'
import { FlatList, Text, View } from 'react-native'
import BookingCard from '@/components/BookingCard'

const tickets: any = [];

const Upcoming = () => {

  const renderEvent = ({item, index}: {item: any, index: number}) => {

    return (
      <BookingCard item={item} index={index} handlePress={() => router.push("/(user)/(protected)/(routes)/EventDetails")} />
    )
  }

  return (
    <View className='flex-1 px-4'>
      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={true}
        data={tickets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderEvent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
        ListEmptyComponent={() => (
          <View>
            <View className="w-full items-center mx-auto justify-center my-6 mt-8 max-w-52 flex-1">
              {/* <Image source={images.noTransaction} className='size-20' resizeMode='contain'/> */}
              <Text className="text-2xl text-center text-blue mt-4 font-ablack">No bookings yet!</Text>
              <Text className="text-sm text-center text-blue mt-1 font-alight">Please start by signing up.</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default Upcoming