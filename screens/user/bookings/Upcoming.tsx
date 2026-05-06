import { router } from 'expo-router'
import { FlatList, Text, View } from 'react-native'
import BookingCard from '@/components/BookingCard'

const tickets = [
  {
    id: "1",
    title: "DJ Jimmy Jat House Show",
    location: "Eko Atlantic City, Lagos",
    date: "Feb. 10th 2025",
    time: "4:00 PM",
    host: "DJ Jimmy Jat",
    quantity: "1 ticket",
    price: "15000",
  },
  {
    id: "2",
    title: "Afrobeats Night Live",
    location: "Admiralty Way, Lekki Phase 1, Lagos",
    date: "Mar. 5th 2025",
    time: "7:30 PM",
    host: "DJ Spinall",
    quantity: "2 tickets",
    price: "20000",
  },
  {
    id: "3",
    title: "Sunset Vibes Party",
    location: "Tarkwa Bay Beach, Lagos",
    date: "Apr. 12th 2025",
    time: "5:00 PM",
    host: "DJ Neptune",
    quantity: "1 ticket",
    price: "10000",
  },
  {
    id: "4",
    title: "Lagos Party Festival",
    location: "Ozumba Mbadiwe Road, Opposite 1004, Victoria Island, Lagos",
    date: "May. 20th 2025",
    time: "6:00 PM",
    host: "DJ Consequence",
    quantity: "3 tickets",
    price: "30000",
  },
  {
    id: "5",
    title: "Rooftop Chill & Grill",
    location: "Victoria Island Rooftop, Lagos",
    date: "Jun. 8th 2025",
    time: "8:00 PM",
    host: "DJ Obi",
    quantity: "1 ticket",
    price: "12000",
  },
  {
    id: "6",
    title: "Midnight House Party",
    location: "Ikoyi Club Road, Ikoyi, Lagos",
    date: "Jul. 18th 2025",
    time: "10:00 PM",
    host: "DJ Xclusive",
    quantity: "2 tickets",
    price: "25000",
  },
  {
    id: "7",
    title: "Beach Rave Experience",
    location: "Elegushi Beach, Lagos",
    date: "Aug. 2nd 2025",
    time: "3:00 PM",
    host: "DJ Kaywise",
    quantity: "1 ticket",
    price: "8000",
  },
  {
    id: "8",
    title: "Old School Throwback Party",
    location: "Surulere Event Hall, Lagos",
    date: "Sep. 14th 2025",
    time: "6:30 PM",
    host: "DJ Jimmy Jat",
    quantity: "2 tickets",
    price: "18000",
  },
  {
    id: "9",
    title: "Luxury Lounge Night",
    location: "The Palms, Lekki, Lagos",
    date: "Oct. 25th 2025",
    time: "9:00 PM",
    host: "DJ Cuppy",
    quantity: "1 ticket",
    price: "35000",
  },
  {
    id: "10",
    title: "End of Year Mega Party",
    location: "Eko Hotel & Suites, Victoria Island, Lagos",
    date: "Dec. 31st 2025",
    time: "10:00 PM",
    host: "DJ Neptune",
    quantity: "4 tickets",
    price: "50000",
  },
];

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
              <Text className="text-2xl text-center text-blue mt-4 font-ablack">No transactions yet!</Text>
              <Text className="text-sm text-center text-blue mt-1 font-alight">All your pending transactions will show here.</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default Upcoming