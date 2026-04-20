import { FlatList, View } from 'react-native'
import RecommendationCard from '@/components/RecommendationCard'
import LogoHeader from '@/components/LogoHeader'
import { StatusBar } from 'expo-status-bar'
import SmallCustomButton from '@/components/SmallCustomButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SearchPlaceholder from '@/components/SearchPlaceholder'
import ShortCategoryCard from '@/components/categories/ShortCategoryCard'

export const traditionalFood = [
  {
    id: 1,
    title: "Amala & Ewedu Spot",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800",
    date: "Daily",
    time: "10:00am - 10:00pm",
    location: "Yaba, Lagos",
    rating: 4.6,
  },
  {
    id: 2,
    title: "Mama Put Kitchen",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800",
    date: "Daily",
    time: "8:00am - 9:00pm",
    location: "Surulere, Lagos",
    rating: 4.4,
  },
  {
    id: 3,
    title: "Ofada Rice Hub",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
    date: "Daily",
    time: "11:00am - 11:00pm",
    location: "Ikeja, Lagos",
    rating: 4.5,
  },
];

export const restaurants = [
  {
    id: 1,
    title: "Skyline Fine Dining",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
    date: "Open Daily",
    time: "12:00pm - 11:00pm",
    location: "Victoria Island, Lagos",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Ocean Breeze Restaurant",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    date: "Open Daily",
    time: "1:00pm - 10:00pm",
    location: "Lekki Phase 1, Lagos",
    rating: 4.5,
  },
  {
    id: 3,
    title: "Urban Spice Kitchen",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800",
    date: "Open Daily",
    time: "11:00am - 9:00pm",
    location: "Ikoyi, Lagos",
    rating: 4.7,
  },
];

export const grills = [
  {
    id: 1,
    title: "Suya Palace",
    category: "Grills",
    image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=800",
    date: "Daily",
    time: "5:00pm - 2:00am",
    location: "Ojuelegba, Lagos",
    rating: 4.7,
  },
  {
    id: 2,
    title: "BBQ & Chill Arena",
    category: "Grills",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
    date: "Daily",
    time: "4:00pm - 12:00am",
    location: "Lekki, Lagos",
    rating: 4.6,
  },
  {
    id: 3,
    title: "Grill Master Hub",
    category: "Grills",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    date: "Daily",
    time: "6:00pm - 1:00am",
    location: "Festac, Lagos",
    rating: 4.5,
  },
];

export const hotels = [
  {
    id: 1,
    title: "Eko Luxury Suites",
    category: "Hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    date: "Available Daily",
    time: "24 Hours",
    location: "Victoria Island, Lagos",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Lekki Beach House",
    category: "AirBnB",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
    date: "Available Daily",
    time: "24 Hours",
    location: "Lekki, Lagos",
    rating: 4.7,
  },
  {
    id: 3,
    title: "City View Apartments",
    category: "Apartment",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
    date: "Available Daily",
    time: "24 Hours",
    location: "Ikeja, Lagos",
    rating: 4.6,
  },
];

export const clubs = [
  {
    id: 1,
    title: "Club Vibes Lagos",
    category: "Nightlife",
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800",
    date: "Fridays - Sundays",
    time: "10:00pm - 4:00am",
    location: "Victoria Island, Lagos",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Lagos Night Lounge",
    category: "Nightlife",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    date: "Daily",
    time: "9:00pm - 3:00am",
    location: "Lekki, Lagos",
    rating: 4.6,
  },
  {
    id: 3,
    title: "VIP Club House",
    category: "Nightlife",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    date: "Weekends",
    time: "11:00pm - 5:00am",
    location: "Ikoyi, Lagos",
    rating: 4.7,
  },
];

export const events = [
  {
    id: 1,
    title: "Afrobeats Live Concert",
    category: "Music",
    image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=800",
    date: "May 12th",
    time: "7:00pm - 1:00am",
    location: "Tafawa Balewa Square",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Beach Party Lagos",
    category: "Party",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    date: "May 20th",
    time: "5:00pm - 12:00am",
    location: "Lekki Beach",
    rating: 4.6,
  },
  {
    id: 3,
    title: "Street Food Festival",
    category: "Food",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    date: "June 2nd",
    time: "12:00pm - 9:00pm",
    location: "Freedom Park",
    rating: 4.7,
  },
];

export default function HomeScreen() {
  return (
    <View className='bg-white flex-1'>
      <LogoHeader showRight right={<SmallCustomButton title='Vendor Account'/>}/>
      <View className='flex-1'>
        <FlatList
          data={[]}
          renderItem={null}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View>
              <SearchPlaceholder/>
              <RecommendationCard/>
              <ShortCategoryCard title="Traditional food joints" data={traditionalFood} onViewAll={() => console.log("View all pressed")}/>
              <ShortCategoryCard title="Restaurants" data={restaurants} />
              <ShortCategoryCard title="Smokes & Grills Hotspot" data={grills} />
              <ShortCategoryCard title="Hotels & AirBnb" data={hotels} />
              <ShortCategoryCard title="Club House" data={clubs} />
              <ShortCategoryCard title="Events" data={events} />
            </View>
          )}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 12 }}
        />
      </View>

      <StatusBar style='dark'/>
    </View>
  )
}