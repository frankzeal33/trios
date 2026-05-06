import { View, Text, FlatList } from 'react-native'
import React from 'react'
import TitleHeader from '@/components/TitleHeader'
import { router } from 'expo-router'
import SearchPlaceholder from '@/components/SearchPlaceholder'
import EventCard from '@/components/EventCard'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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

export default function EventsScreen() {

  const { bottom } = useSafeAreaInsets()

  const renderEvent = ({item, index}: {item: any, index: number}) => {
    return (
      <EventCard item={item} index={index}/>
    )
  }

  return (
    <View className="flex-1 bg-white">
      <TitleHeader title='Events' showBack onpress={() => router.back()}/>
      <SearchPlaceholder containerStyle='px-4'/>
      <View className='border-b border-black'/>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingHorizontal: 16, paddingTop: 16, paddingBottom: bottom + 8 }}
        renderItem={renderEvent}
        ListEmptyComponent={() => (
          <View>
            <View className="w-full items-center mx-auto justify-center my-6 mt-8 max-w-52 flex-1">
              {/* <Image source={images.cart} className='size-36' resizeMode='contain'/> */}
              <Text className="text-2xl text-center mt-4 font-ablack">No events found!</Text>
              <Text className="text-sm text-center mt-1 font-alight">All events will show here.</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}