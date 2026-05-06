import React, { useEffect, useRef } from 'react'
import { Animated, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function FloatingPin({
  x,
  y,
  label,
  color
}: {
  x: number
  y: number
  label: string
  color: string
}) {

  const opacity = useRef(new Animated.Value(1)).current
  const scale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const delay = Math.random() * 2000 // random start

    const timeout = setTimeout(() => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0.3,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 1.15,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start()
    }, delay)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        alignItems: 'center',
        opacity,
        transform: [{ scale }],
      }}
    >
      {/* Label */}
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          paddingHorizontal: 8,
          paddingVertical: 3,
          borderRadius: 10,
          marginBottom: 1,
        }}
      >
        <Text className='text-white max-w-24 text-xs font-psbold text-center' numberOfLines={3}>
          {label}
        </Text>
      </View>

      {/* Pin */}
      <Ionicons name="location-sharp" size={50} color={color} />
    </Animated.View>
  )
}