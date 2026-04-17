import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const notFound = () => {

  return (
    <SafeAreaView className="bg-white flex-1 h-full px-4 items-center justify-center">
      <Text className='text-xl font-abold'>Screen Not Found</Text>
    </SafeAreaView>
  )
}

export default notFound