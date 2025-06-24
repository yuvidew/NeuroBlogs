import { View, Text, Image } from 'react-native'
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@clerk/clerk-expo';
import Swiper from "react-native-swiper";
import { router } from 'expo-router';
import { images } from '@/constants/images';
import CustomButton from '@/components/CustomButton';


const welcomeContent = [
  {
    img: images.welcome3,
    title: "Welcome to Neuroblog",
    content: "Your intelligent space to write, read, and discover powerful stories — powered by AI and designed for modern creators.",
  },
  {
    img: images.welcome2,
    title: "Create Smarter, Not Harder",
    content: "Let AI help you draft compelling blog posts in seconds. Just share your idea, and watch it turn into publish-ready content.",
  },
  {
    img: images.welcome,
    title: "Connect With Real-Time Content",
    content: "Read the latest posts, join conversations, and follow your favorite authors — all in real-time, across devices.",
  }
];


/**
 * Welcome screen component for the NeuroBlog app.
 * 
 * Displays a swiper with onboarding slides introducing the app's features.
 * Allows users to skip onboarding or proceed to sign up.
 * 
 * @component
 * @returns {JSX.Element | null} The rendered welcome screen, or null if user data is not loaded.
 * 
 * @remarks
 * - Uses `react-native-swiper` for slide navigation.
 * - Uses Clerk for user authentication state.
 * - Navigates to sign-up screen on "Skip" or after the last slide.
 * 
 * @param {object} props - No props are accepted by this component.
 */



const Welcome = () => {
  const { isLoaded, } = useUser();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === welcomeContent.length - 1;
  if (!isLoaded) return null;

  // if (isSignedIn) router.replace("/(root)/(tabs)");
  return (
    <SafeAreaView className=' flex h-full items-center justify-between bg-white'>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[7px] h-[7px] mx-0.5 bg-primary-200 rounded-[10rem]" />
        }
        activeDot={
          <View className="w-[32px] h-[7px] mx-0.5 bg-primary-700 rounded-[10rem]" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}

      >
        {welcomeContent.map((item, index) => (
          <View key={index}
            className="flex items-center justify-start gap-14  h-full"
          >
            <Image
              source={item.img}
              className="w-[450px] h-[450px]"
              resizeMode="contain"
            />

            <View
              className=" items-center justify-center w-full  gap-5 px-2"
            >
              <Text className=' text-center text-secondary-900 text-3xl font-JakartaBold  '>
                {item.title}
              </Text>
              <Text className="  text-lg font-JakartaSemiBold text-center text-secondary-800 mx-5 mt-3">
                {item.content}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <View className='flex-row items-center gap-4 px-7 py-9 justify-between'>
        <CustomButton
          title='Skip '
          className=' w-[50%] rounded-full '
          bgVariant='secondary'
          textVariant='primary'
          onPress={() => router.replace("/(auth)/sign-up")}
        />
        <CustomButton
          title={isLastSlide ? "Get Stared" : "Next"}
          className=' w-[50%] rounded-full '
          onPress={() =>
            isLastSlide
              ? router.replace("/(auth)/sign-up")
              : swiperRef.current?.scrollBy(1)
          }
        />
      </View>
    </SafeAreaView>
  )
}

export default Welcome