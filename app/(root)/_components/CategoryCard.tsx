import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { CategoryCardProps } from '../types/type'
/**
 * @param img - Image URL for the category card
 * @param category - Category name to display
 * @param onPress - Function to call when the card is pressed
 * @param className - Optional additional class names for styling
 */

const CategoryCard = (
    {
        img,
        category,
        onPress,
        className = "w-full"
    }:CategoryCardProps
) => {
    return (
        <TouchableOpacity onPress={onPress}  className={` relative flex-1  h-40 rounded-2xl overflow-hidden ${className}`}>
            <Image
                src={img}

                className='w-full h-full '
                resizeMode="cover"
            />
            <View className=' w-full h-full absolute top-0 left-0 p-5 justify-end bg-black/40'>
                <Text className=' font-JakartaBold text-secondary-100 text-lg'>{category}</Text>

                <Text className=' font-JakartaMedium text-sm text-secondary-300'>
                    100 blogs
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryCard