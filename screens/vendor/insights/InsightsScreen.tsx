import TitleHeader from '@/components/TitleHeader'
import VendorEventCard from '@/components/vendor/VendorEventCard';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import TopEventCard from '@/components/vendor/TopEventCard';

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
    likes: 120,
    views: 850,
    tickets: 50,
    status: "active",
  },
  {
    id: 2,
    title: "Beach Party",
    category: "Party",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    date: "Feb. 20th",
    time: "6:00pm - 11:00pm",
    location: "Lekki Beach",
    rating: 4.7,
    likes: 300,
    views: 1500,
    tickets: 120,
    status: "inactive",
  },
  {
    id: 3,
    title: "Live Concert",
    category: "Music",
    image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=800",
    date: "Mar. 2nd",
    time: "7:00pm - 1:00am",
    location: "Tafawa Balewa Square",
    rating: 4.8,
    likes: 500,
    views: 3200,
    tickets: 200,
    status: "active",
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
    likes: 250,
    views: 2100,
    tickets: 90,
    status: "inactive",
  },
];

const stats = [
  { label: "Total Bookings", value: "762", change: "+3% increase past 7 days", positive: true },
  { label: "Total Views",    value: "3,796", change: "-2% decrease past 7 days", positive: false },
  { label: "Total Clicks",  value: "945", change: "+6% increase past 7 days", positive: true },
  { label: "Total Likes",   value: "560", change: "+6% increase past 7 days", positive: true },
];

function InsightsHeader() {
  const [balanceVisible, setBalanceVisible] = useState(true);

  return (
    <View className="w-full">
      {/* Wallet Dashboard Card */}
      <View className="w-full rounded-2xl bg-purple p-3 my-2">
        <Text className="text-white text-center font-psbold text-base mb-4">
          Wallet Dashboard
        </Text>

        {/* Available for withdrawal */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-row items-center gap-2 flex-1">
            <Ionicons name="wallet-outline" size={20} color="rgba(255,255,255,0.75)" style={{ marginTop: 2 }} />
            <View className='flex-1'>
              <View className="flex-row items-center gap-1 flex-wrap">
                <Text className="text-white font-pmedium text-[10px]">Available for withdrawal</Text>
                <Text className="text-white font-pregular text-[8px]">(95% Total Revenue)</Text>
              </View>
              <Text className="text-white font-psbold text-xl mt-0.5">
                {balanceVisible ? "₦11,922,690.00" : "₦••••••••"}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setBalanceVisible((v) => !v)} activeOpacity={0.7}>
            <Ionicons
              name={balanceVisible ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="rgba(255,255,255,0.75)"
            />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="border-b border-white/20 mb-4" />

        {/* Total Revenue + Withdraw */}
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-center gap-2 flex-1">
           <MaterialCommunityIcons name="bank-outline" size={20} color="rgba(255,255,255,0.75)" style={{ marginTop: 2 }} />
            <View className='flex-1'>
              <View className="flex-row items-center gap-1 flex-wrap">
                <Text className="text-white font-pmedium text-[10px]">Total Revenue Generated</Text>
                <Text className="text-white font-pregular text-[8px]">(100% Revenue)</Text>
              </View>
              <Text className="text-white font-psbold text-lg mt-0.5">
                {balanceVisible ? "₦12,550,200.00" : "₦••••••••"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row items-center gap-1 bg-orange rounded-full px-4 py-2"
            onPress={() => router.push("/(vendor)/(protected)/(tabs)/insights/Withdrawal")}
          >
            <MaterialCommunityIcons name="bank-transfer-out" size={16} color="#fff" />
            <Text className="text-white font-psbold text-xs">Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats grid — 2 columns */}
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

      {/* Section title */}
      <Text className="text-base font-psbold text-black">Your Top Events</Text>
    </View>
  );
}

export default function InsightsScreen() {

    const renderEvent = ({item, index}: {item: any, index: number}) => {
      return (
        <TopEventCard item={item} index={index}/>
      )
  }

  return (
    <View className="h-full flex-1 bg-white">
      <TitleHeader title="Insights" />
      <View className="flex-1 px-4">
        <FlatList
          nestedScrollEnabled={true}
          scrollEnabled={true}
          data={events}
          ListHeaderComponent={<InsightsHeader />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderEvent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingBottom: 16 }}
          ListEmptyComponent={() => (
            <View>
              <View className="w-full items-center mx-auto justify-center my-6 mt-8 max-w-52 flex-1">
                {/* <Image source={images.noTransaction} className='size-20' resizeMode='contain'/> */}
                <Text className="text-2xl text-center text-blue mt-4 font-ablack">
                  No top events yet!
                </Text>
                <Text className="text-sm text-center text-blue mt-1 font-alight">
                  All your top events will show here.
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
