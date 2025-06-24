import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { getDateLabel } from "@/utils/getDays";
import { CardProps } from "../types/type";

/**
 * Card component displays a blog post preview with cover image, title, author info, and published date.
 *
 * @param {() => void} [onPress] - Optional callback function to handle card press event.
 * @param {string} title - The title of the blog post.
 * @param {string} coverImage - URL of the cover image for the blog post.
 * @param {string} authorImage - URL of the author's profile image.
 * @param {string} authorName - Name of the author.
 * @param {string} publishedAt - Date string representing when the post was published.
 * @param {string} [categories] - Optional categories associated with the blog post.
 */

export const Card = ({
    onPress,
    title,
    coverImage,
    authorImage,
    authorName,
    publishedAt,
}: CardProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className=" flex-1 gap-3 bg-white rounded-2xl  w-60 h-[22rem] "
        >
            <View className="relative">
                <TouchableOpacity className="flex flex-row items-center  bg-primary-700 p-3 rounded-full z-50 absolute top-5 right-5">
                    <Image source={icons.save} tintColor={"#ffffff"} className="size-5" />
                </TouchableOpacity>

                <Image
                    source={{
                        uri: coverImage,
                    }}
                    className="w-full h-52 rounded-lg"
                />
            </View>

            <View className=" gap-4">
                <Text className=" text-secondary-800 line-clamp-2 font-JakartaBold text-lg">
                    {title}
                </Text>

                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                        <Image
                            source={{
                                uri: authorImage,
                            }}
                            className=" size-7 rounded-full"
                        />

                        <Text className="text-primary-700 text-sm font-JakartaMedium">
                            {authorName}
                        </Text>
                    </View>
                    <Text className="text-secondary-700 font-JakartaMedium text-sm">
                        {getDateLabel(publishedAt)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export const ListCard = (
    {
    onPress,
    title,
    coverImage,
    authorImage,
    authorName,
    publishedAt,
    categories
}: CardProps
) => {
    return (
        <TouchableOpacity onPress={onPress} className=" h-44 flex-row gap-4">
            <View className=" h-full w-[35%]">
                <Image
                    source={{
                        uri: coverImage,
                    }}
                    className="w-full h-full rounded-2xl"
                />
            </View>
            <View className="flex-col gap-3 py-2 justify-between w-[61%] ">
                <Text className=" text-secondary-800 line-clamp-2 font-JakartaBold text-lg">
                    {title}
                </Text>
                <View className="flex-row items-center gap-2">
                    <Image
                        source={{
                            uri: authorImage,
                        }}
                        className=" size-7 rounded-full"
                    />

                    <Text className="text-primary-700 text-sm font-JakartaMedium">
                        {authorName}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between ">
                    <Text className="text-secondary-700 font-JakartaMedium text-sm">
                        {getDateLabel(publishedAt)}
                    </Text>
                    <View className="flex-row items-center ">
                        {categories && (
                            <Text className=" font-Jakarta text-xs rounded-full text-secondary-900 bg-primary-300/50 px-3 py-1 line-clamp-1">
                                {categories}
                            </Text>
                        )}
                        <TouchableOpacity className="flex flex-row items-center p-2  rounded-ful">
                            <Image source={icons.save} className="size-4" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
