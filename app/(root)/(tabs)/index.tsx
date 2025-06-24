import { Card, ListCard } from "@/app/(root)/_components/Card";
import CategoryCard from "@/app/(root)/_components/CategoryCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { api } from "@/convex/_generated/api";
import categories from "@/data/categories.json";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const blogs = useQuery(api.blogs.getAllBlogs);

  if (!blogs) {
    return (
      <SafeAreaView className="bg-white h-full items-center justify-center">
        <ActivityIndicator size="large" className="text-[#C67C4E]" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={blogs}
        renderItem={({ item }) => (
          <ListCard
            title={item.title}
            coverImage={item.coverImage}
            authorImage={item.author.image}
            authorName={item.author.name}
            publishedAt={item.publishedAt}
            categories={item.categories}
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
          ) : null
        }
        ListHeaderComponent={
          <View className=" gap-5">
            {/* start logo and notification bell */}
            <View className="flex-row items-center justify-between ">
              <View className="flex-row items-center gap-2 py-3">
                <Image source={icons.icon} className="size-10" />
                <Text className="font-JakartaBold text-2xl text-secondary-800">
                  Neuroblog
                </Text>
              </View>
              <TouchableOpacity>
                <Image source={icons.bell} className="size-7" />
              </TouchableOpacity>
            </View>
            {/* end logo and notification bell */}

            {/* start hero page */}
            <View className="h-44  relative rounded-2xl overflow-hidden">
              <Image
                source={images.hero}
                className="w-full h-full "
                resizeMode="cover"
              />
              <View className="p-5 absolute top-0 left-0 h-full w-full justify-between bg-black/50">
                <Text className=" font-JakartaBold text-2xl text-secondary-100">
                  Learn how to become a great writer right now
                </Text>
                <TouchableOpacity className="bg-secondary-200/80 px-4 py-2 w-32 text-center items-center justify-center rounded-full">
                  <Text className="font-JakartaBold text-primary-700 mb-1 text-md">
                    Read more
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* end hero page */}

            {/* start to recent blogs */}
            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-primary-700 font-JakartaMedium text-lg">
                Recent blogs
              </Text>
              <TouchableOpacity>
                <Image source={icons.rightArrow} className="size-6" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={blogs.filter(
                (blog) =>
                  new Date(blog.publishedAt).toISOString().split("T")[0] ===
                  new Date().toISOString().split("T")[0]
              )}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Card
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
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              contentContainerClassName="flex gap-5 mt-2"
            />
            {/* end to recent blogs */}

            {/* start explore by topics */}

            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-primary-700 font-JakartaMedium text-lg">
                Explore by topics
              </Text>
              <TouchableOpacity>
                <Image source={icons.rightArrow} className="size-6" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={categories}
              keyExtractor={(item) => item.category}
              renderItem={({ item }) => (
                <CategoryCard
                  img={item.image}
                  category={item.category}
                  onPress={
                    () => router.push({
                      pathname: "/(root)/category_details/[category]",
                      params: { category: item.category }
                    })
                  }
                  className="w-60"
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              contentContainerClassName="flex gap-5 mt-2 "
            />

            {/* end explore by topics */}

            {/* start list of all blog */}
            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-primary-700 font-JakartaMedium text-lg">
                All blogs
              </Text>
              <TouchableOpacity>
                <Image source={icons.rightArrow} className="size-6" />
              </TouchableOpacity>
            </View>
            {/* end list of all blog */}
          </View>
        }
      />
    </SafeAreaView>
  );
}
