import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const _layout = () => {

  return (
    <>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='index'/>
        <Stack.Screen name='Credentials'/>
      </Stack>

    </>
  )
}

export default _layout