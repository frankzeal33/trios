import { View, Text, TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Octicons } from '@expo/vector-icons';

type headerProps = {
  title: string,
  right?: ReactElement, 
  showRight?: boolean;
  showBack?: boolean;
  onpress?: () => void
}

export default function TitleHeader({title, showBack, showRight, right, onpress}: headerProps) {

  const top = useSafeAreaInsets().top

  return (
    <View className='flex-row items-center justify-between px-4 pb-2 gap-1 bg-white' style={{ paddingTop: top + 12}}>
      <View className='flex-row gap-2 items-center'>
        {showBack && (
          <TouchableOpacity onPress={onpress}><Octicons name="chevron-left" size={28} color="black" /></TouchableOpacity>
        )}
        <Text className='text-orange text-3xl font-psbold'>{title}</Text>
      </View>
      {showRight ? (
        right
      ) : (
        <View className='w-7'/>
      )}
    </View>
  )
}