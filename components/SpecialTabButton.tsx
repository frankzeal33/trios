import { Entypo } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const SpecialTabButton = () => {

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(vendor)/(protected)/(routes)/AddEvent');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button} activeOpacity={0.85}>
      <Entypo name="plus" size={30} color="#fff" />
    </TouchableOpacity>
  );
  
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 6,
    left: '50%',
    transform: [{ translateX: -18 }],
    backgroundColor: '#6A11CB',
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    // boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
  },
});
