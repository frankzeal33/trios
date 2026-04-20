import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { ReactElement } from 'react'
import { Octicons } from '@expo/vector-icons';
import { images } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type headerProps = {
  right?: ReactElement, 
  showRight?: boolean;
  onpress?: () => void
}

export default function LogoHeader({showRight, right, onpress}: headerProps) {

  const top = useSafeAreaInsets().top

  return (
    <View className='flex-row items-center justify-between px-4 pb-3 gap-1 bg-gray-tab' style={{ paddingTop: top + 12}}>
      <View className='flex-row gap-1 items-center'>
        <Image source={images.logo} resizeMode="contain" className='size-9'/>
        <Text className='text-purple text-2xl font-pbold mt-1'>Trios</Text>
      </View>
      {showRight ? (
        right
      ) : (
        <View className='w-7'/>
      )}
    </View>
  )
}