import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { images } from "../constants";
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const logoParts = [
  images.part1,
  images.part2,
  images.part3
];

export default function Splash() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finalLogoVisible, setFinalLogoVisible] = useState(false);
  const { top, bottom } = useSafeAreaInsets();

  useEffect(() => {
    if (currentIndex < logoParts.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      // All parts done, show final logo
      setTimeout(() => {
        setFinalLogoVisible(true);
        // Navigate after final logo is shown
        setTimeout(() => {
          router.replace('/LocationsOnboard');
        }, 3000);
      }, 100);
    }
  }, [currentIndex]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground source={images.splash} resizeMode="cover" style={styles.image}>
          <View className="flex-1 justify-between items-center gap-4 px-4">
            <View className='w-4' style={{ marginBottom: top + 12 }}/>
            
            {/* Animate current part only */}
            {currentIndex < logoParts.length && (
              <Animated.Image
                key={currentIndex}
                source={logoParts[currentIndex]}
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(200)}
                style={styles.logo}
                resizeMode="contain"
              />
            )}

            {/* Final logo + Buzzycash */}
            {finalLogoVisible && (
              <View className="items-center justify-center">
                <Animated.Image
                  source={images.logo}
                  entering={FadeIn.duration(200)}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Animated.Text
                  entering={FadeIn.duration(2000).delay(800).springify()}
                  className="text-orange font-psboldItalic italic text-xl mt-1"
                >
                  Discover <Text className="text-white">Lagos</Text>
                </Animated.Text>
                <Animated.Text
                  entering={FadeIn.duration(2000).delay(800).springify()}
                  className="text-orange font-psboldItalic italic text-xl mt-1"
                >
                  <Text className='text-white'>Be</Text> Involved <Text className='text-white'>in</Text> the Moment.
                </Animated.Text>
              </View>
            )}

            <Text className='text-purple text-4xl font-pebold' style={{ marginBottom: bottom + 12 }}>Trios</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 100,
  },
});
