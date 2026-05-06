import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ListRenderItem,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useAnimatedRef,
  interpolate,
  Extrapolation,
  scrollTo,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import ReviewItem from '@/components/ReviewItem';

const { width: W } = Dimensions.get('window');
const NAV_H = 50;

type FilterTab = { id: string; label: string; star?: boolean };
type Review = {
  id: string;
  name: string;
  initial: string;
  date: string;
  rating: number;
  body: string;
};

const FILTER_TABS: FilterTab[] = [
  { id: 'all',      label: 'All'      },
  { id: 'positive', label: 'Positive' },
  { id: 'critical', label: 'Critical' },
  { id: '5',        label: '5',  star: true },
  { id: '4',        label: '4',  star: true },
  { id: '3',        label: '3',  star: true },
  { id: '2',        label: '2',  star: true },
  { id: '1',        label: '1',  star: true },
];

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

const stats = [
  { label: 'Total Bookings', value: '102', change: '+3% increase past 7 days', positive: true  },
  { label: 'Total Views',    value: '600', change: '-2% decrease past 7 days', positive: false },
  { label: 'Total Clicks',   value: '250', change: '+6% increase past 7 days', positive: true  },
  { label: 'Total Likes',    value: '48',  change: '+2% increase past 7 days', positive: true  },
];

function TopNavBar({ topInset }: { topInset: number }) {
  return (
    <View
      className="absolute left-0 right-0 z-20 bg-white"
      style={{ top: 0, paddingTop: topInset }}
    >
      <View
        className="flex-row items-center justify-between px-4"
        style={{ height: NAV_H }}
      >
        <TouchableOpacity onPress={() => router.back()}><Octicons name="chevron-left" size={28} color="black" /></TouchableOpacity>
        <Text className='text-orange text-3xl font-psbold'>Insights</Text>
        <View className="w-9" />
      </View>
    </View>
  );
}

type FilterStripProps = {
  activeFilter: string;
  onPress: (id: string, index: number) => void;
};

function FilterStrip({ activeFilter, onPress }: FilterStripProps) {
  const ref = useAnimatedRef<ScrollView>();

  const handlePress = (id: string, index: number) => {
    onPress(id, index);
    scrollTo(ref, Math.max(0, index * 88 - W / 2 + 44), 0, true);
  };

  return (
    <View style={{ backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#e5e7eb' }}>
      <ScrollView
        ref={ref as any}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 10, gap: 8 }}
      >
        {FILTER_TABS.map((tab, i) => {
          const active = tab.id === activeFilter;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => handlePress(tab.id, i)}
              activeOpacity={0.75}
              style={{
                flexDirection: 'row', 
                alignItems: 'center', 
                gap: 4,
                paddingHorizontal: 16,
                paddingVertical: 6,
                borderRadius: 6,
                backgroundColor: active ? '#6A11CB' : '#E7E7E7',
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: active ? '600' : '400',
                  color: active ? '#fff' : '#374151',
                }}
              >
                {tab.label}
              </Text>
                {tab.star && (
                    <Ionicons
                        name="star"
                        size={12}
                        color="#FFA41C"
                    />
                )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

type InsightHeaderProps = {
  topInset: number;
  activeFilter: string;
  onFilterPress: (id: string, index: number) => void;
  onFilterStripLayout: (y: number) => void;
};

function InsightHeader({
  topInset,
  activeFilter,
  onFilterPress,
  onFilterStripLayout,
}: InsightHeaderProps) {
  const navOffset = topInset + NAV_H;

  return (
    <View className="bg-white">
      <View style={{ paddingTop: navOffset + 12 }} className="px-4 pb-2">
        {/* Event name pill */}
        <View className="self-center bg-gray rounded-full px-5 py-2 mb-5">
          <Text className="text-sm font-pmedium text-black text-center">Surulere Community Concert</Text>
        </View>

        {/* Revenue cards */}
        <View className="flex-row gap-2 mb-2">
          {/* Purple card */}
          <View className="flex-1 rounded-2xl bg-purple px-3 py-6 justify-center">
            <Text className="text-white font-pregular text-[10px] mb-1">Total Revenue Generated</Text>
            <Text className="text-white font-psbold text-base">₦500,000.00</Text>
          </View>
          {/* Orange card */}
          <View className="flex-1 rounded-2xl bg-orange px-3 py-6 justify-center">
            <Text className="text-white font-pregular text-[10px] mb-1">Available Revenue (95%)</Text>
            <Text className="text-white font-psbold text-base">₦475,000.00</Text>
          </View>
        </View>

        {/* Stats grid */}
        <View className="flex-row flex-wrap mb-2">
            {stats.map((stat, i) => (
                <View
                    key={stat.label}
                    className={`w-1/2 py-4 ${i % 2 === 0 ? "pr-4" : ""} ${i < 2 ? "border-b border-gray-100" : ""}`}
                >
                    <Text className="text-2xl font-psbold text-black">{stat.value}</Text>
                    <Text className="text-sm font-pregular text-black mt-0.5">{stat.label}</Text>
                    <Text
                        className={`text-xs font-pregular mt-1 ${stat.positive ? "text-green-600" : "text-red-600"}`}
                    >
                        {stat.change}
                    </Text>
                </View>
            ))}
        </View>

        {/* Reviews title */}
        <Text className="text-lg font-psbold text-black mt-1">Reviews</Text>
      </View>

      {/* Inline filter strip — measured so we know when to show sticky overlay */}
      <View onLayout={(e) => onFilterStripLayout(e.nativeEvent.layout.y)}>
        <FilterStrip activeFilter={activeFilter} onPress={onFilterPress} />
      </View>

      {/* Sub-header row: active filter label + sort */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center gap-1">
            <Text className="text-sm font-pmedium text-gray-600">
                {FILTER_TABS.find(t => t.id === activeFilter)?.label ?? 'All'}
            </Text>
            {FILTER_TABS.find(t => t.id === activeFilter)?.star && (
                <Ionicons name="star" size={13} color="#FFA41C" />
            )}
        </View>
        <TouchableOpacity className="flex-row items-center gap-1">
          <Text className="text-sm font-pmedium text-gray-700">Most Relevant</Text>
          <MaterialIcons name="sort" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function EventInsightScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('all');

  const scrollY         = useSharedValue(0);
  const filterStripOffY = useSharedValue(9999);
  const navOffset       = insets.top + NAV_H;

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => { scrollY.value = e.contentOffset.y; },
  });

  // Sticky filter overlay — same interpolation logic as TikTok template
  const filterOverlayStyle = useAnimatedStyle(() => {
    const threshold = filterStripOffY.value - navOffset;
    const opacity = interpolate(
      scrollY.value,
      [threshold - 4, threshold],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      pointerEvents: (opacity > 0 ? 'auto' : 'none') as any,
    };
  });

  const handleFilterStripLayout = useCallback((y: number) => {
    filterStripOffY.value = y;
  }, []);

  const handleFilterPress = useCallback((id: string) => {
    setActiveFilter(id);
  }, []);

  // Filter reviews by active tab
  const filteredReviews = REVIEWS.filter((r) => {
    if (activeFilter === 'all')      return true;
    if (activeFilter === 'positive') return r.rating >= 4;
    if (activeFilter === 'critical') return r.rating <= 2;
    return r.rating === Number(activeFilter);
  });

  const ListHeader = useCallback(
    () => (
      <InsightHeader
        topInset={insets.top}
        activeFilter={activeFilter}
        onFilterPress={handleFilterPress}
        onFilterStripLayout={handleFilterStripLayout}
      />
    ),
    [insets.top, activeFilter, handleFilterPress, handleFilterStripLayout],
  );

  const renderItem: ListRenderItem<Review> = useCallback(
    ({ item, index }) => (
      <ReviewItem item={item} isLast={index === filteredReviews.length - 1} />
    ),
    [filteredReviews.length],
    );

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Scrollable content */}
      <Animated.FlatList
        data={filteredReviews}
        keyExtractor={(r) => r.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        ListEmptyComponent={() => (
          <View className="items-center justify-center py-16">
            <Text className="text-base font-pmedium text-gray-400">No reviews yet</Text>
          </View>
        )}
      />

      {/* Fixed nav bar */}
      <TopNavBar topInset={insets.top} />

      {/* Sticky filter strip overlay — fades in when inline one scrolls off */}
      <Animated.View
        className="absolute left-0 right-0 z-10 bg-white"
        style={[{ top: navOffset }, filterOverlayStyle]}
      >
        <FilterStrip activeFilter={activeFilter} onPress={handleFilterPress} />
      </Animated.View>
    </View>
  );
}