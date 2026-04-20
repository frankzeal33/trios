import { View, Text, Pressable, Image } from 'react-native'
import React, { ReactElement } from 'react'
import Entypo from '@expo/vector-icons/Entypo';

type rowProp = {
  title: string;
  image?: any;
  lefticon?: ReactElement;
  onpress: () => void;
}

export default function SpaceBetween({
  title,
  image,
  onpress,
  lefticon
}: rowProp) {
  return (
    <Pressable 
      onPress={onpress} 
      className="justify-between w-full flex-row items-center border-b border-gray-200 py-4"
    >
      {/* Left side (icon + text) */}
      <View className="flex-1 w-full flex-row items-center gap-2">
        {lefticon ? (
          lefticon
        ) : (
          <View>
            <Image 
              source={image} 
              className="w-10 h-10" 
              resizeMode="contain" 
            />
          </View>
        )}
        
        {/* Title + description */}
        <View className="flex-1 flex-col">
          <View className="flex-row items-center">
            <Text 
              className="font-pregular text-base flex-1"
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
        </View>
      </View>

      {/* Right arrow */}
      <Entypo name="chevron-small-right" size={24} color="#000" />
    </Pressable>
  )
}
