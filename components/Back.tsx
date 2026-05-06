import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Octicons } from '@expo/vector-icons'
import { router } from 'expo-router'

export default function Back({ onpress }: { onpress?: () => void }) {
  return (
    <TouchableOpacity 
      onPress={onpress ?? (() => router.back())} 
      className='my-3'
    >
      <Octicons name="chevron-left" size={28} color="black" />
    </TouchableOpacity>
  )
}