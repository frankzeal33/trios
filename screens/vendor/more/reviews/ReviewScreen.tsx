import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import Header from '@/components/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Octicons } from '@expo/vector-icons'
import ReviewItem from '@/components/ReviewItem'

type Review = {
  id: string;
  name: string;
  initial: string;
  date: string;
  rating: number;
  body: string;
};

const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Tolani Faju',
    initial: 'T',
    date: 'Feb. 26th, 2026',
    rating: 4,
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '2',
    name: 'Ferrari Falana',
    initial: 'F',
    date: 'Feb. 14th, 2026',
    rating: 4,
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: '3',
    name: 'Adaeze Okonkwo',
    initial: 'A',
    date: 'Jan. 30th, 2026',
    rating: 5,
    body: 'Absolutely loved the event! Great organisation and atmosphere. Would definitely attend again.',
  },
  {
    id: '4',
    name: 'Emeka Nwosu',
    initial: 'E',
    date: 'Jan. 20th, 2026',
    rating: 3,
    body: 'Decent event but the sound system could have been better. Overall okay experience.',
  },
  {
    id: '5',
    name: 'Bisi Adeleke',
    initial: 'B',
    date: 'Jan. 10th, 2026',
    rating: 5,
    body: 'One of the best events I have attended this year. Everything was on point!',
  },
  {
    id: '6',
    name: 'Tolani Faju',
    initial: 'T',
    date: 'Feb. 26th, 2026',
    rating: 4,
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '7',
    name: 'Ferrari Falana',
    initial: 'F',
    date: 'Feb. 14th, 2026',
    rating: 4,
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: '8',
    name: 'Adaeze Okonkwo',
    initial: 'A',
    date: 'Jan. 30th, 2026',
    rating: 5,
    body: 'Absolutely loved the event! Great organisation and atmosphere. Would definitely attend again.',
  },
];

export default function ReviewScreen() {

  const { top, bottom } = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white px-4" style={{ paddingTop: top }}>
      <Header
        title="Reviews"
        showGoBack={true}
        onpress={() => router.back()}
      />
      <FlatList
        data={REVIEWS}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ReviewItem item={item} isLast={index === REVIEWS.length - 1} />
        )}
        nestedScrollEnabled
        contentContainerStyle={{ paddingBottom: bottom + 16 }}
      />
    </View>
  );
}