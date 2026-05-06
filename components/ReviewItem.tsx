import { FontAwesome } from "@expo/vector-icons";
import { memo } from "react";
import { Text, View } from "react-native";
import Stars from "react-native-stars";

type Review = {
  id: string;
  name: string;
  initial: string;
  date: string;
  rating: number;
  body: string;
};

const ReviewItem = memo(({ item, isLast }: { item: Review; isLast: boolean }) => (
  <View className={`px-4 py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
    <View className="flex-row items-center justify-between gap-2 mb-2">
      <View className="flex-row items-center gap-3 flex-1">
        {/* Avatar circle */}
        <View className="w-10 h-10 rounded-full bg-[#e8e0f5] items-center justify-center">
          <Text className="text-[#5B2D8E] font-psbold text-base">{item.initial}</Text>
        </View>
        <View className='flex-1'>
          <Text className="text-sm font-psbold text-gray-900" numberOfLines={2}>{item.name}</Text>
          <View className="flex-row mt-0.5">
            <Stars
              display={item?.rating}
              spacing={2}
              count={5}
              starSize={14}
              fullStar={<FontAwesome name="star" size={14} color="#FFA41C" />}
              emptyStar={<FontAwesome name="star-o" size={14} color="#D5DBDB" />}
              halfStar={<FontAwesome name="star-half-o" size={14} color="#FFA41C" />}
            />
          </View>
        </View>
      </View>
      <Text className="text-xs font-pelight">{item.date}</Text>
    </View>
    <Text className="text-sm font-pregular leading-5">{item.body}</Text>
  </View>
));

export default ReviewItem;