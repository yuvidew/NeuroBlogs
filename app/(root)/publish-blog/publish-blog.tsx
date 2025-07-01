import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useCreatedBlogStorage } from '@/store/useCreatedBlogStorage'
import { icons } from '@/constants/icons';
import CustomButton from '@/components/CustomButton';
import Markdown from 'react-native-markdown-display';
import { router } from 'expo-router';
import UploadImage from './_components/UploadImage';
import { useUser } from '@clerk/clerk-expo';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';


const PublishBlog = () => {
    const { blog } = useCreatedBlogStorage();
    const { user } = useUser();
    const [selectImage, setSelectImage] = useState("");
    const onCreateBlog = useMutation(api.blogs.createBlog);
    const [loading, setLoading] = useState<boolean>(false);

    /**
 * @component PublishBlog
 * 
 * @description
 * This component renders the final preview and publishing interface for a blog post.
 * It pulls blog data from global state (`useCreatedBlogStorage`) and allows the user to:
 * - Upload a cover image
 * - Preview the title and markdown content
 * - Submit the blog to the backend using a Convex mutation
 * 
 * @params
 * - `blog`: Blog data including title, content, tags, and category from state.
 * - `selectImage`: Local state for the uploaded cover image.
 * - `onPress`: Function triggered on "Publish" button press, which:
 *   - Validates and submits the blog
 *   - Calls Convex `createBlog` mutation
 *   - Tracks loading state
 */

    const onPress = async () => {
        setLoading(true);
        try {
            const id = await onCreateBlog({
                title: blog.title,
                slug: blog.slug,
                coverImage: selectImage,
                content: blog.content,
                categories: blog.category,
                author: {
                    id: user?.id as string,
                    name: `${user?.firstName} ${user?.lastName}` || (user?.fullName as string),
                    image: user?.imageUrl as string,
                },
                tags: blog.tags,
                likes: 0,
                publishedAt : String(new Date())
            });
            router.replace(`/(root)/details/${id}`)
        } catch (error) {
            console.error("Failed to create blog:", error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <SafeAreaView className=' bg-white relative h-full px-5 py-8 gap-9'>
            <ScrollView showsVerticalScrollIndicator={false} className="mb-32 ">

                {/* start to header */}
                <View className=' gap-0'>
                    <View className="flex-row items-center justify-between ">
                        <View className="flex-row items-center gap-2 py-3">
                            <TouchableOpacity onPress={() => router.replace("/(root)/(tabs)/create-blog")}>
                                <Image source={icons.cancel} className="size-5" tintColor={"#4D4D4D"} />
                            </TouchableOpacity>
                            <Text className="font-JakartaBold text-2xl text-secondary-800">
                                Create ...
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={icons.more} className="size-7" />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* end to header */}

                <View className=' gap-8 mt-5'>
                    {/* start to upload image  */}
                    <UploadImage
                        selectImg={selectImage}
                        category={blog.category}
                        onSelectImg={(value) => setSelectImage(value)}
                    />
                    {/* end to upload image  */}

                    {/* start to category */}
                    <View className='flex-row items-center gap-5'>
                        <TouchableOpacity className=' border border-primary-700 px-3 py-1 rounded-md bg-transparent w-auto' >
                            <Text className=' text-primary-700 font-JakartaMedium text-sm' >
                                {blog.category}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* end to category */}

                    {/* start to blog title */}
                    <Text className=' text-3xl font-JakartaBold text-secondary-800'>
                        {blog.title}
                    </Text>
                    {/* end to blog title */}

                    {/* start to blog content */}
                    <Markdown
                        style={{
                            body: {
                                fontFamily: 'Jakarta-Regular',
                                fontSize: 16,
                                lineHeight: 24,
                                color: '#1f2937', // gray-800
                            },
                            heading1: {
                                fontFamily: 'Jakarta-Bold',
                                fontSize: 28,
                                color: '#111827',
                                marginBottom: 10,
                            },
                            heading2: {
                                fontFamily: 'Jakarta-SemiBold',
                                fontSize: 22,
                                color: '#1f2937',
                                marginTop: 20,
                                marginBottom: 10,
                            },
                            strong: {
                                fontFamily: 'Jakarta-Bold',
                                color: '#111827',
                            },
                            bullet_list: {
                                marginVertical: 8,
                            },
                            list_item: {
                                fontSize: 16,
                                fontFamily: 'Jakarta-Regular',
                                color: '#374151',
                            },
                        }}
                    >
                        {blog.content}
                    </Markdown>
                    {/* end to blog content */}
                </View>
            </ScrollView>

            {/* start to published button */}
            <View className="absolute bottom-5 left-0 right-0 p-5 bg-white ">
                <CustomButton 
                    onPress={onPress} 
                    disabled={selectImage === ""} 
                    title="Publish" 
                    className="w-full mb-5 rounded-full"
                    loading = {loading}
                />
            </View>
            {/* end to published button */}

        </SafeAreaView>
    )
}

export default PublishBlog