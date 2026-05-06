import TitleHeader from "@/components/TitleHeader";
import { View, Text, SectionList, Image, Pressable, TouchableOpacity } from "react-native";

// helper to group into rows of 2
const toRows = (data: any[]) => {
  const rows = [];
  for (let i = 0; i < data.length; i += 2) {
    rows.push(data.slice(i, i + 2));
  }
  return rows;
};

const recent = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    title: "Live Music Night in Lagos",
    category: "Music",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800",
    title: "Beach Hangout & Chill",
    category: "Relaxation",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800",
    title: "Street Food Festival",
    category: "Food",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    title: "Night Party Experience",
    category: "Party",
  },
];

const favorites = [
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800",
    title: "Afrobeats Concert",
    category: "Music",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    title: "VIP Lounge Party",
    category: "Party",
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    title: "Beach Sunset Vibes",
    category: "Relaxation",
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800",
    title: "Street Food Fiesta",
    category: "Food",
  },
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    title: "Late Night Chill Spot",
    category: "Relaxation",
  },
  {
    id: "10",
    image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=800",
    title: "Club Night Experience",
    category: "Party",
  },
  {
    id: "11",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    title: "Outdoor Picnic Day",
    category: "Relaxation",
  },
  {
    id: "12",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800",
    title: "Gourmet Food Tasting",
    category: "Food",
  },
  {
    id: "13",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    title: "Live Band Night",
    category: "Music",
  },
  {
    id: "14",
    image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800",
    title: "Luxury Rooftop Party",
    category: "Party",
  },
  {
    id: "15",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    title: "Food Market Tour",
    category: "Food",
  },
  {
    id: "16",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    title: "Ocean Breeze Escape",
    category: "Relaxation",
  },
];

const sections = [
  {
    title: "Recently viewed",
    data: toRows(recent), 
  },
  {
    title: "Favorites",
    data: toRows(favorites),
  },
];

export default function SavedScreen() {
  return (
    <View className="flex-1 bg-white">
      <TitleHeader title="Saved" />
      <SectionList
        sections={sections}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}

        renderSectionHeader={({ section }) => (
          <Text className="px-4 py-2 text-base font-pmedium text-black bg-white">
            {section.title}
          </Text>
        )}

        renderItem={({ item: row, index, section }) => {
          const totalRows = section.data.length;

          const isFirst = index === 0;
          const isLast = index === totalRows - 1;

          return (
            <View className="px-4">
              
              {/* vertical gap */}
              {index !== 0 && <View className="h-1" />}

              <View className="flex-row">
                
                {/* LEFT */}
                <View style={{ width: "49.5%" }}>
                  <Pressable
                    className={`h-[140px] overflow-hidden
                      ${isFirst ? "rounded-tl-2xl" : ""}
                      ${isLast ? "rounded-bl-2xl" : ""}
                    `}
                  >
                    <Image
                      source={{ uri: row[0]?.image }}
                      className="absolute inset-0 w-full h-full"
                    />

                    <View className="absolute inset-0 bg-black/30" />

                    <View className="flex-1 justify-between p-2">
                      <Text className="text-white text-sm font-semibold" numberOfLines={3}>
                        {row[0]?.title}
                      </Text>

                      <TouchableOpacity className="bg-yellow-700 self-start px-2 py-1 rounded-md">
                        <Text className="text-white text-xs font-medium">
                          {row[0]?.category}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Pressable>
                </View>

                {/* horizontal gap */}
                <View style={{ width: "1%" }} />

                {/* RIGHT */}
                {row[1] && (
                  <View style={{ width: "49.5%" }}>
                    <Pressable
                      className={`h-[140px] overflow-hidden
                        ${isFirst ? "rounded-tr-2xl" : ""}
                        ${isLast ? "rounded-br-2xl" : ""}
                      `}
                    >
                      <Image
                        source={{ uri: row[1]?.image }}
                        className="absolute inset-0 w-full h-full"
                      />

                      <View className="absolute inset-0 bg-black/30" />

                      <View className="flex-1 justify-between p-2">
                        <Text className="text-white text-sm font-semibold" numberOfLines={3}>
                          {row[1]?.title}
                        </Text>

                        <TouchableOpacity className="bg-yellow-700 self-start px-2 py-1 rounded-md">
                          <Text className="text-white text-xs font-medium">
                            {row[1]?.category}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
            );
        }}
      />
    </View>
  );
}