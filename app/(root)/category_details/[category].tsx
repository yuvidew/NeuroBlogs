import { ListCard } from '@/app/(root)/_components/Card';
import { icons } from '@/constants/icons';
import { api } from '@/convex/_generated/api';
import categoriesList from "@/data/categories.json";
import { useQuery } from 'convex/react';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CategoryDetails = () => {
    const [categories, setCategories] = useState<{ category: string, description: string[], image: string }[]>(categoriesList);
    const { category } = useLocalSearchParams();
    const blogs = useQuery(api.blogs.getExplore, {
        query: "",
        categories: category as string
    })

    useEffect(() => {
        setCategories((prev) => prev.filter((item, i) => item.category === category))
    }, [category])


    return (
        <SafeAreaView className=' bg-white h-full'>
            <FlatList
                data={blogs}
                renderItem={({ item }) => (
                    <ListCard
                        title={item.title}
                        coverImage={item.coverImage}
                        authorImage={item.author.image}
                        authorName={item.author.name}
                        publishedAt={item.publishedAt}
                        onPress={() => router.push({
                            pathname: "/(root)/details/[id]",
                            params: { id: item._id }
                        })}
                    />
                )}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                className="flex-1"
                contentContainerClassName="pb-32 gap-5 px-5"
                ListEmptyComponent={
                    !blogs ? (
                        <ActivityIndicator size="large" className="text-[#C67C4E] mt-7" />
                    ) : blogs.length === 0 ? (
                        <Text className=' text-secondary-700 text-md' >
                            No {category} found.
                        </Text>
                    ) : null
                }

                ListHeaderComponent={
                    <View className=' gap-4' >
                        {/* start back button and category name */}
                        <View className=' flex items-center flex-row gap-2 pt-0' >
                            <TouchableOpacity onPress={() => router.replace("/(root)/(tabs)/discover")} className="flex flex-row  rounded-full size-11 items-center justify-center">
                                <Image source={icons.backArrow} className="size-6" tintColor={"#4D4D4D"} />
                            </TouchableOpacity>

                            <Text className=' font-JakartaBold text-2xl text-secondary-800' >
                                {category}
                            </Text>
                        </View>
                        {/* end back button and category name */}

                        {/* start to cover image of category */}
                        <View className=' h-48 rounded-lg overflow-hidden'>
                            <Image src={categories[0].image} className=' h-full rounded-lg' />
                            <View className=' w-full h-full absolute top-0 left-0 p-5 justify-end bg-black/40'>
                                <Text className=' font-JakartaBold text-secondary-100 text-lg'>
                                    {category}
                                </Text>
                                <Text className=' font-JakartaMedium text-sm text-secondary-300'>
                                    100 blogs
                                </Text>
                            </View>
                        </View>
                        {/* end to cover image of category */}

                        {/* start to sort by function */}
                        <View className=' flex flex-row justify-between mt-5'>
                            <Text className=' text-xl font-JakartaBold'>
                                Sort by
                            </Text>
                            <TouchableOpacity className='flex-row items-center gap-2'>
                                <Text className='text-md font-JakartaSemiBold text-primary-800'>
                                    Most popular
                                </Text>
                                <Image source={icons.upDown} className='size-4' />
                            </TouchableOpacity>
                        </View>
                        {/* end to sort by function */}
                    </View>
                }
            />
        </SafeAreaView>
    )
}

export default CategoryDetails
