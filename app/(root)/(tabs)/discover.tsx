import CategoryCard from '@/app/(root)/_components/CategoryCard'
import Search from '@/app/(root)/_components/Search'
import { icons } from '@/constants/icons'
import { api } from '@/convex/_generated/api'
import categories from "@/data/categories.json"
import { useQuery } from 'convex/react'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Discover = () => {
  const { query } = useLocalSearchParams<{ query?: string }>();
  const blogsList = useQuery(api.blogs.getExplore, {
    categories: undefined,
    query: query ?? "",
  })

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={categories}
        renderItem={({ item }) =>
          <CategoryCard
            img={item.image}
            category={item.category}
            onPress={
              () => router.push({
                pathname: "/(root)/category_details/[category]",
                params: { category: item.category }
              })
            }
          />
        }
        keyExtractor={(item) => item.category}
        numColumns={2}
        columnWrapperClassName="flex gap-5"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 gap-5 px-5"
        ListHeaderComponent={
          <View className=' gap-5'>
            {/* start logo and notification bell */}
            <View className="flex-row items-center justify-between ">
              <View className="flex-row items-center gap-2 py-3">
                <Image source={icons.icon} className="size-10" />
                <Text className="font-JakartaBold text-2xl text-secondary-800">
                  Discover
                </Text>
              </View>
              <TouchableOpacity>
                <Image source={icons.more} className="size-7" />
              </TouchableOpacity>
            </View>
            {/* end logo and notification bell */}
            {/* start search bar */}
            <Search />
            {/* end search bar */}

            {/* start listing all search blogs */}
            {blogsList === undefined || blogsList === null ? null :
              blogsList.length === 0 ? (
                <Text>No blogs found.</Text>
              ) : (
                blogsList.map(({ title, _id }, i) => (
                  <TouchableOpacity onPress={() => router.push({
                    pathname: "/(root)/details/[id]",
                    params: { id: _id }
                  })} key={i} className='p-3 border-b border-secondary-200 flex flex-row items-center justify-between'>
                    <Text className='font-Jakarta text-sm'>{title}</Text>
                    <Image
                      source={icons.exportIcon}
                      className='size-4'
                      tintColor={"#999999"}
                    />
                  </TouchableOpacity>
                ))
              )
            }

            {/* end listing all search blogs */}
          </View>
        }
      />
    </SafeAreaView>
  )
}

export default Discover