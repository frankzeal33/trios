import TitleHeader from '@/components/TitleHeader'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import Active from './Active'
import Inactive from './Inactive'

const ListingsScreen = () => {

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  
  const renderScene = SceneMap({
    first: Active,
    second: Inactive
  });
  
  const routes = [
    { key: 'first', title: 'Active' },
    { key: 'second', title: 'Inactive' }
  ];

  // Render the custom tab bar
  const renderTabBar = (props: any) => {
    const { routes, index } = props.navigationState;

    return (
      <View className="border-b border-black mx-4">
        <View className="flex-row">
          {routes.map((route: any, i: number) => {
            const isFocused = index === i;

            return (
              <TouchableOpacity
                key={route.key}
                className="flex-1 items-center py-2"
                onPress={() => props.jumpTo(route.key)}
              >
                <Text
                  className={`text-base font-psbold ${
                    isFocused ? "text-purple" : "text-black"
                  }`}
                >
                  {route.title}
                </Text>

                {/* Active indicator */}
                {isFocused && (
                  <View className="absolute bottom-0 w-full h-[2px] bg-purple" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <TitleHeader title='My Listings'/>
      <View className='flex-1 rounded-t-3xl'>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{ width: layout.width }}
        />
      </View>
      <StatusBar style='dark'/>
    </View>
  )
}

export default ListingsScreen
