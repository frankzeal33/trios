import { FlatList, Text, View } from 'react-native'
import RecommendationCard from '@/components/RecommendationCard'
import LogoHeader from '@/components/LogoHeader'
import { StatusBar } from 'expo-status-bar'
import SmallCustomButton from '@/components/SmallCustomButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SearchPlaceholder from '@/components/SearchPlaceholder'
import ShortCategoryCard from '@/components/categories/ShortCategoryCard'
import { router } from 'expo-router'
import VendorEventCard from '@/components/vendor/VendorEventCard'


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

export default function HomeScreen() {


  
  const renderEvents = ({item, index}: {item: any, index: number}) => {

    return (
      <VendorEventCard item={item} index={index} containerStyle='mb-8' handlePress={() => router.push({
        pathname: "/(vendor)/(protected)/(routes)/VendorEventDetails",
        params: { Recieptdata: JSON.stringify({}) },
      })}/>
    )
  }

  return (
    <View className='bg-white flex-1'>
      <LogoHeader showRight right={<SmallCustomButton title='User Account' handlePress={() => router.replace("/(user)/(protected)/(tabs)/Home")}/>}/>
      <View className='flex-1 px-4'>
        <FlatList
          data={events}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View>
              <SearchPlaceholder/>
              <View className="flex-row items-center gap-1 justify-between mb-3">
                <Text className="font-psbold text-lg">My Events</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => item?.id.toString()}
          renderItem={renderEvents}
          nestedScrollEnabled
        />
      </View>

      <StatusBar style='dark'/>
    </View>
  )
}