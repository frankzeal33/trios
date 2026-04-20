import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface RestaurantHeaderProps {
  title: string;
  scrollOffset: SharedValue<number>;
}

const SCOLL_THRESHOLD = 60;

const ProfileHeader = ({ title, scrollOffset }: RestaurantHeaderProps) => {
  const insets = useSafeAreaInsets();

  const header1Style = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, SCOLL_THRESHOLD * 0.6],
      [1, 0],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scrollOffset.value,
      [0, SCOLL_THRESHOLD * 0.6],
      [0, -10],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const header2Style = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [SCOLL_THRESHOLD * 0.3, SCOLL_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scrollOffset.value,
      [SCOLL_THRESHOLD * 0.3, SCOLL_THRESHOLD],
      [-10, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const shadowStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, SCOLL_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      shadowOpacity: opacity * 0.1,
      elevation: opacity * 4,
    };
  });

  return (
    <Animated.View style={[styles.headerContainer, shadowStyle, { paddingTop: insets.top, backgroundColor: "#fff" }]}>
      {/* Header 1 */}
      <Animated.View style={[styles.header1, header1Style]}>
        <Text className='text-orange text-3xl font-psbold'>{title}</Text>
        <Pressable className='relative'>
          {true && (
            <View className="absolute -top-2 -right-1 bg-orange rounded-full min-w-[18px] items-center justify-center px-[4px] z-50">
              <Text className="text-white text-sm font-mbold" numberOfLines={1} adjustsFontSizeToFit>5</Text>
            </View>
          )}
          <SimpleLineIcons name="bell" size={22} color="black" />
        </Pressable>
      </Animated.View>

      {/* Header 2 */}
      <Animated.View style={[styles.header2, header2Style]}>
        <View className='w-7'/>
        <Text className='font-psbold text-orange text-xl'>{title}</Text>
        <Pressable className='relative'>
          {true && (
            <View className="absolute -top-2 -right-1 bg-orange rounded-full min-w-[18px] items-center justify-center px-[4px] z-50">
              <Text className="text-white text-sm font-mbold" numberOfLines={1} adjustsFontSizeToFit>5</Text>
            </View>
          )}
          <SimpleLineIcons name="bell" size={18} color="black" />
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F3F4F6',
    zIndex: 100,
    // boxShadow: '0px 2px 4px -2px rgba(0, 0, 0, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4
  },
  header1: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  header2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export default ProfileHeader
