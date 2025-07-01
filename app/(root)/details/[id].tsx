import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { router } from 'expo-router';
import { icons } from '@/constants/icons';
import { getDateLabel } from '@/utils/getDays';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';



const markdownStyles = {
    body: {
        fontFamily: 'Jakarta-Medium',
        fontSize: 16,
        lineHeight: 24,
        color: '#1f2937',
    },
    heading1: {
        fontFamily: 'Jakarta-Medium',
        fontSize: 28,
        color: '#111827',
        marginBottom: 10,
    },
    heading2: {
        fontFamily: 'Jakarta-Medium',
        fontSize: 22,
        color: '#1f2937',
        marginTop: 20,
        marginBottom: 10,
    },
    paragraph: {
        marginBottom: 12,
    },

    list_item: {
        fontSize: 16,
        fontFamily: 'Jakarta-Medium',
        color: '#374151',
    },
    strong: {
        fontFamily: 'Jakarta-Bold',
        color: '#111827',
    },
    bullet_list: {
        marginVertical: 8,
    },
};

const Details = () => {
    const { id } = useLocalSearchParams();
    const blog = useQuery(api.blogs.getBlogById, {
        id: id as Id<"blogs">
    })

    if (!blog?._id) {
        return (
            <SafeAreaView className="bg-white h-full items-center justify-center">
                <ActivityIndicator size="large" className="text-[#C67C4E]" />
            </SafeAreaView>
        );
    }

    return (
        <ScrollView>
            {/* start to back button , save button */}
            <View className='flex flex-row items-center justify-between top-10 z-30 absolute w-full p-4 px-6' >
                <TouchableOpacity onPress={() => router.replace("/(root)/(tabs)")} className="flex flex-row bg-primary-200/10 rounded-full size-11 items-center justify-center">
                    <Image source={icons.backArrow} className="size-5" tintColor={"#fff"} />
                </TouchableOpacity>

                <View className=' flex flex-row items-center justify-end gap-4' >
                    <TouchableOpacity onPress={() => {
                        //Todo :create a like func
                    }} className="flex flex-row bg-primary-200/10 rounded-full size-11 items-center justify-center">
                        <Image source={icons.heart} className="size-5" tintColor={"#fff"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        //Todo :create a save func
                    }} className="flex flex-row bg-primary-200/10 rounded-full size-11 items-center justify-center">
                        <Image source={icons.save} className="size-5" tintColor={"#fff"} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        //Todo :create a commit func
                    }} className="flex flex-row bg-primary-200/10 rounded-full size-11 items-center justify-center">
                        <Image source={icons.more} className="size-5" tintColor={"#fff"} />
                    </TouchableOpacity>
                </View>

            </View>
            {/* end to back button , save button */}

            {/* start to cover image */}
            <View className=' h-[30rem]'>
                <Image
                    src={blog.coverImage}
                    className='w-full h-full'
                    resizeMode="cover"
                />
            </View>
            {/* end to cover image */}
            <View className='p-5 gap-6'>
                {/* start to blog title */}
                <Text className=' text-4xl font-JakartaBold text-secondary-800'>
                    {blog.title}
                </Text>
                {/* end to blog title */}

                {/* start to author info */}
                <View className=' border-t flex flex-row items-center justify-between border-b py-5 border-primary-200' >
                    <View className=' flex flex-row items-center gap-5'>
                        <Image source={{
                            uri: blog.author.image
                        }} resizeMode="cover" className=' size-16 rounded-full' />

                        <Text className=' text-2xl font-JakartaSemiBold text-secondary-900'>
                            {blog.author.name}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => { }} className=' px-5 py-2 rounded-full bg-primary-800 text-secondary-100'
                    >
                        <Text className='text-secondary-100 font-JakartaSemiBold text-md'>
                            Follow
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* end to author info */}

                {/* start to category and day ago */}
                <View className='flex-row items-center gap-5' >
                    <TouchableOpacity className=' border border-primary-400 px-3 py-1 rounded-md bg-transparent' >
                        <Text className=' text-primary-400 font-JakartaMedium text-sm' >
                            {blog.categories}
                        </Text>
                    </TouchableOpacity>
                    <Text className="text-secondary-700 font-JakartaMedium text-sm">
                        {getDateLabel(blog.publishedAt)}
                    </Text>
                </View>
                {/* end to category and day ago */}

                {/* start to content */}
                <Markdown
                    markdownit={MarkdownIt({ html: false }).disable(['link', 'image'])}
                    style={markdownStyles}
                >
                    {blog.content}
                </Markdown>
                {/* end to content */}

                {/* start to comments */}
                <View className=' border-t flex-col gap-4 py-5  border-primary-200'>
                    <View className='flex flex-row items-center justify-between' >
                        <Text className='text-xl text-secondary-900 font-JakartaBold'>Comment 120</Text>

                        <TouchableOpacity>
                            <Image source={icons.rightArrow} className="size-6" />
                        </TouchableOpacity>
                    </View>

                    {/* Todo: complte commit section and more blog card section  */}

                    {/* start listing of comments */}
                    <View className='flex flex-col gap-3' >
                        <View className='flex flex-row gap-4' >
                            <View className=' flex flex-row items-center gap-3' >
                                <Image src="https://i.pinimg.com/736x/67/d4/73/67d473ac5acd3069d909813c79d55942.jpg" resizeMode="cover" className=' size-8 rounded-full' />

                                <Text className=' text-lg text-secondary-900 font-JakartaSemiBold' >
                                    John Doe
                                </Text>
                            </View>

                            <TouchableOpacity>
                                <Image source={icons.dots} className=' size-6' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* end listing of comments */}
                </View>
                {/* end to comments */}
            </View>
        </ScrollView>
    )
}

export default Details