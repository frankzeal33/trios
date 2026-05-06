import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import Header from '@/components/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Octicons } from '@expo/vector-icons'

type Booking = {
  id: string;
  name: string;
  ref: string;
  ticketQty: number;
  date: string;
  avatar: string;
};

const bookings: Booking[] = [
  {
    id: '1',
    name: 'Oluseun Jimmy',
    ref: '#47364729495',
    ticketQty: 1,
    date: 'Feb. 10th at 6:25pm',
    avatar: 'https://i.pravatar.cc/150?u=oluseun',
  },
  {
    id: '2',
    name: 'Ibrahim Jimoh',
    ref: '#22223764738',
    ticketQty: 2,
    date: 'Feb. 9th at 10:15am',
    avatar: 'https://i.pravatar.cc/150?u=ibrahim',
  },
  {
    id: '3',
    name: 'Gloria James',
    ref: '#68493869032',
    ticketQty: 1,
    date: 'Feb. 9th at 8:40am',
    avatar: 'https://i.pravatar.cc/150?u=gloria',
  },
  {
    id: '4',
    name: 'Stella Nguma',
    ref: '#56382940963',
    ticketQty: 3,
    date: 'Feb. 8th at 3:00pm',
    avatar: 'https://i.pravatar.cc/150?u=stella',
  },
  {
    id: '5',
    name: 'Gabriel Oshanisi',
    ref: '#57684939201',
    ticketQty: 1,
    date: 'Feb. 8th at 11:25am',
    avatar: 'https://i.pravatar.cc/150?u=gabriel',
  },
  {
    id: '6',
    name: 'Salome Dang',
    ref: '#38291047732',
    ticketQty: 2,
    date: 'Feb. 7th at 5:10pm',
    avatar: 'https://i.pravatar.cc/150?u=salome',
  },
  {
    id: '7',
    name: 'Tunde Bakare',
    ref: '#91823645501',
    ticketQty: 1,
    date: 'Feb. 7th at 1:30pm',
    avatar: 'https://i.pravatar.cc/150?u=tunde',
  },
  {
    id: '8',
    name: 'Amaka Obi',
    ref: '#74563829104',
    ticketQty: 4,
    date: 'Feb. 6th at 9:00am',
    avatar: 'https://i.pravatar.cc/150?u=amaka',
  },
  {
    id: '9',
    name: 'Chukwuemeka Eze',
    ref: '#63728190345',
    ticketQty: 1,
    date: 'Feb. 6th at 7:45pm',
    avatar: 'https://i.pravatar.cc/150?u=emeka',
  },
  {
    id: '10',
    name: 'Fatima Aliyu',
    ref: '#29384756102',
    ticketQty: 2,
    date: 'Feb. 5th at 2:15pm',
    avatar: 'https://i.pravatar.cc/150?u=fatima',
  },
];

const BookingListCard = ({ item, isLast }: { item: Booking; isLast: boolean }) => (
  <View className={`w-full flex-row items-start gap-4 py-5 ${!isLast ? 'border-b border-gray-100' : ''}`}>
    <Image
      source={{ uri: item.avatar }}
      className="w-14 h-14 rounded-full bg-gray-200"
      resizeMode="cover"
    />
    <View className="flex-1">
      <Text className="font-psbold text-base text-black">{item.name}</Text>
      <Text className="font-pmedium text-sm mt-0.5">{item.ref}</Text>
      <View className="flex-row items-center gap-1 mt-1.5">
        <Text className="font-pmedium text-sm">Ticket Qty:</Text>
        <Text className="font-pregular text-sm">
          {item.ticketQty} {item.ticketQty === 1 ? 'ticket' : 'tickets'}
        </Text>
      </View>
      <Text className="font-pregular text-sm mt-0.5">{item.date}</Text>
    </View>
  </View>
);

export default function BookingListScreen() {

  const { top, bottom } = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white px-4" style={{ paddingTop: top }}>
      <Header
        title="List of Bookings"
        showGoBack={true}
        onpress={() => router.back()}
        showRight
        icon={<Octicons name="search" size={22} color="#000" />}
      />
      <FlatList
        data={bookings}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <BookingListCard item={item} isLast={index === bookings.length - 1} />
        )}
        nestedScrollEnabled
        contentContainerStyle={{ paddingBottom: bottom + 16 }}
      />
    </View>
  );
}