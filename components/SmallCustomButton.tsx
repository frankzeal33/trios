import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Text, TouchableOpacity } from 'react-native';

type buttonProps = {
  title: string;
  handlePress?: () => void;
  containerStyles?: string;
  bgColor?: string;
  textStyles?: string;
  isLoading?: boolean;
  disableButton?: boolean;
}

const SmallCustomButton = ({ title, handlePress, containerStyles, bgColor, textStyles, isLoading, disableButton }: buttonProps) => {
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9} className={`${bgColor ? bgColor : "bg-white"} rounded-xl px-4 min-h-[32px] justify-center items-center ${containerStyles} ${isLoading || disableButton ? 'opacity-50' : ''}`} disabled={isLoading || disableButton}
      style={{
        elevation: 4, // Android
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      }}
    >
      {isLoading ? <FontAwesome5 name="circle-notch" size={20} color="white" className='animate-spin-fast'/> :
        <Text className={`font-pmedium text-xs ${textStyles}`}>{title}</Text>
      }
    </TouchableOpacity>
  )
}

export default SmallCustomButton