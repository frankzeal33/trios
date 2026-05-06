import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from '@/constants'
import FloatingPin from '@/components/FloatingPin'
import Checkbox from 'expo-checkbox'
import { Link, router } from 'expo-router'
import CustomButton from '@/components/CustomButton'

const COLORS = [
  '#A1A1AA', // gray
  '#C084FC', // purple
  '#F472B6', // pink
  '#60A5FA', // blue
  '#34D399', // green
  '#FBBF24', // amber
]

const locations = [
  { id: 1, x: 0.2, y: 0.1, label: "Mutitala" },
  { id: 2, x: 0.4, y: 0.2, label: "Ikeja" },
  { id: 3, x: 0.7, y: 0.3, label: "Shopping Mall" },
  { id: 4, x: 0.3, y: 0.4, label: "Government House" },
  { id: 5, x: 0.5, y: 0.5, label: "Eko Hotel" },
  { id: 6, x: 0.25, y: 0.6, label: "Lekki" },
  { id: 7, x: 0.65, y: 0.7, label: "Gbagada" },
  { id: 8, x: 0.4, y: 0.75, label: "Victoria Island" },
  { id: 9, x: 0.75, y: 0.8, label: "Ago Palace" },
]

// keep points inside oval
const clampToOval = (x: number, y: number) => {
  const cx = 0.5
  const cy = 0.5

  const rx = 0.5 // horizontal radius
  const ry = 0.5 // FULL vertical reach (this fixes your top issue)

  const dx = x - cx
  const dy = y - cy

  const value = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry)

  if (value > 1) {
    const scale = 1 / Math.sqrt(value)
    return {
      x: cx + dx * scale,
      y: cy + dy * scale,
    }
  }

  return { x, y }
}

export default function LocationsOnboard() {

  const { top, bottom } = useSafeAreaInsets()
  const [layout, setLayout] = useState({ width: 0, height: 0 })
  const [visibleIndexes, setVisibleIndexes] = useState([0, 1, 2, 3, 4])
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
        setVisibleIndexes((prev) => {
        return prev.map((i) => (i + 1) % locations.length)
        })
    }, 3000) // change every 3s

    return () => clearInterval(interval)
    }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1" edges={['left', 'right']}>

        <ImageBackground
          source={images.onboardPic1}
          className="flex-1"
          resizeMode="cover"
        >

          {/* Dark overlay */}
          <View className="absolute inset-0 bg-black/80" />

          <View
            className="flex-1 justify-between"
            style={{ paddingTop: top, paddingBottom: bottom, gap: 30 }}
          >

            {/* Title */}
            <Text className="text-3xl font-psbold text-orange text-center mt-4 px-4">
              Welcome to Trios!
            </Text>

            {/* Map Card */}
            <View
                onLayout={(e) => setLayout(e.nativeEvent.layout)}
                className="flex-1 w-full self-center overflow-hidden"
                style={{
                    borderRadius: 100, // large value = smooth oval edges
                }}
            >
              <ImageBackground
                source={images.onboardPic2}
                style={{ flex: 1 }}
              >

                {locations.map((item, index) => {
                    if (!visibleIndexes.includes(index)) return null

                    const safe = clampToOval(item.x, item.y)

                    const px = safe.x * layout.width
                    const py = safe.y * layout.height

                    const color = COLORS[index % COLORS.length]
                    // const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]

                    return (
                      <FloatingPin
                        key={item.id}
                        x={px}
                        y={py}
                        label={item.label}
                        color={color}
                      />
                    )
                })}

              </ImageBackground>
            </View>

            {/* Bottom */}
            <View className="mb-2 items-center px-4">

              <CustomButton title='Get Started' handlePress={() => router.push("/(user)/(auth)")} containerStyles='w-full' textStyles='text-white' disableButton={!isChecked}/>

              <View className='w-full flex-row items-center gap-2 mt-2'>
                <Checkbox value={isChecked} onValueChange={setChecked} color='#FF5F00' style={styles.checkbox}/>
                <View className="flex-1">
                  <Text className="text-white text-sm mt-3 font-pmedium">
                    By continuing, you automatically agree to Trios{' '}
                    <Text className="text-orange font-psbold">
                    privacy policies
                    </Text>{' '}
                    and{' '}
                    <Text className="text-orange font-psbold">
                    Terms of Service
                    </Text>
                  </Text>
                </View>
              </View>

            </View>

          </View>

        </ImageBackground>

        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 2,
    borderColor: '#fff',
    borderWidth: 1,
    width: 18,
    height: 18
  },
});