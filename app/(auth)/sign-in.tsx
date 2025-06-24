import OAuth from "@/app/(auth)/_components/OAuth";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants/icons";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputField from "../../components/InputField";

/**
 * SignIn component for handling user authentication.
 *
 * Renders a sign-in form with email and password fields, OAuth options,
 * and navigation links. Handles sign-in logic using Clerk's useSignIn hook.
 *
 * @returns {JSX.Element} The rendered sign-in screen.
 *
 * @param {object} props - The component props.
 */


const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const onSignInPress = async () => {
    if (!isLoaded) return

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(root)/(tabs)')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }


  return (
    <ScrollView className=" h-full bg-white py-8">
      <View className="flex-1 justify-center h-full mt-3 gap-6 px-5">
        {/* start back button */}
        <TouchableOpacity onPress={() => router.replace("/(auth)/welcome")}>
          <Image source={icons.backArrow} className="size-7" />
        </TouchableOpacity>
        {/* end back button */}

        {/* start sign form */}
        <View className="gap-5 mt-5">
          <Text className="text-2xl text-primary-700 font-JakartaSemiBold ">
            Welcome 👋
          </Text>
          <Text className="text-lg font-Jakarta text-secondary-700">
            Please enter your name, email and password to sign in
          </Text>

          <View className="gap-8 mt-5 border-b border-secondary-200 pb-14">
            <InputField
              label="Email"
              placeholder="email"
              textContentType="emailAddress"
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
              containerStyle="border-b-2 border-b-primary-700 bg-white"
            />
            <InputField
              label="Password"
              placeholder="password"
              isPassword
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
              containerStyle="border-b-2 border-b-primary-700 bg-white"
            />
          </View>
          <View className=" mt-3 gap-8 border-b border-secondary-200 pb-14">
            {/* start google , apple and facebook oauth button */}
            <OAuth />
            {/* end google , apple and facebook oauth button */}
          </View>
          <View className=" mt-3 ">
            <CustomButton
              title="Sign In"
              onPress={onSignInPress}
              className="mt-3 rounded-full"
            />
            {/* start link to switch sign in page  */}
            <Link
              href="/sign-up"
              className="text-lg text-center text-general-200 mt-10"
            >
              Don`t have an account?{" "}
              <Text className="text-primary-500">Sign up</Text>
            </Link>
            {/* end link to switch sign in page  */}
          </View>
        </View>
        {/* end sign form */}
      </View>
    </ScrollView>
  );
};

export default SignIn;
