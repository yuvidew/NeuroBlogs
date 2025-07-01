import { View, Text, SafeAreaView, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useClerk, useUser } from '@clerk/clerk-expo';
import * as Linking from "expo-linking";
import { icons } from '@/constants/icons';

const Profile = () => {
  const {signOut } = useClerk();
  const {isLoaded ,  user } = useUser();

  if (!isLoaded) {
    return (
      <SafeAreaView className="bg-white h-full justify-center items-center">
        <ActivityIndicator className="text-primary-500" size="large" />
      </SafeAreaView>
    );
  }

  const onLogout = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL("/sign-in"));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri:  user?.imageUrl}}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity onPress={onLogout} className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold mt-2">{user?.fullName}</Text>
          </View>
        </View>
    </SafeAreaView>
  )
}

export default Profile