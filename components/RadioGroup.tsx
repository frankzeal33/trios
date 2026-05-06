import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

type Option = {
  label: string;
  value: string;
}

type RadioGroupProps = {
  title?: string;
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  containerStyles?: string;
  direction?: 'row' | 'col';
}

const RadioGroup = ({
  title,
  options,
  selectedValue,
  onChange,
  containerStyles,
  direction = 'col' // default vertical
}: RadioGroupProps) => {
  return (
    <View className={containerStyles}>
      {title && (
        <Text className="text-base font-pregular mb-2">{title}</Text>
      )}

      <View
        className={`
          ${direction === 'row' ? 'flex-row flex-wrap items-center' : 'flex-col'}
          gap-4
        `}
      >
        {options.map(item => (
          <TouchableOpacity
            key={item.value}
            onPress={() => onChange(item.value)}
            className="flex-row items-center gap-2"
            activeOpacity={0.7}
          >
            <View
              className={`size-6 rounded-full border items-center justify-center ${
                item.value === selectedValue
                  ? 'border-orange-500'
                  : 'border-black'
              }`}
            >
              {item.value === selectedValue && (
                <View className="size-4 rounded-full bg-orange" />
              )}
            </View>

            <Text className="text-base font-plight">
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default RadioGroup