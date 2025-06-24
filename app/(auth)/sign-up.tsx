import OAuth from '@/app/(auth)/_components/OAuth'
import CustomButton from '@/components/CustomButton'
import { icons } from '@/constants/icons'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ReactNativeModal } from "react-native-modal"
import InputField from '../../components/InputField'
import OTPInputField from './_components/OTPInputField'


/**
 * Signup component handles user registration and email verification flow.
 *
 * Renders a sign-up form with fields for name, email, and password, as well as OAuth options.
 * After successful sign-up, prompts the user to verify their email address via a modal.
 * Handles verification code input and displays success or error states accordingly.
 *
 * @returns {JSX.Element} The rendered sign-up screen component.
 *
 * @param {object} form - State object containing user input for name, email, and password.
 * @param {string} form.name - The user's name.
 * @param {string} form.email - The user's email address.
 * @param {string} form.password - The user's password.
 *
 * @param {object} verification - State object for managing verification flow.
 * @param {string} verification.state - The current verification state ("default", "pending", "success", "failed").
 * @param {string} verification.error - Error message for verification failures.
 * @param {string} verification.code - The verification code entered by the user.
 */

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });

    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      await setActive({ session: completeSignUp.createdSessionId });
      setVerification({
        ...verification,
        state: "success",
      });
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  return (
    <ScrollView className=' h-full bg-white py-8'>
      <View className='flex-1 justify-center h-full mt-3 gap-6 px-5'>
        {/* start back button */}
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/welcome")}
        >
          <Image
            source={icons.backArrow}
            className='size-7'

          />
        </TouchableOpacity>
        {/* end back button */}

        {/* start sign form */}
        <View className='gap-5 mt-5'>
          <Text className="text-2xl text-primary-700 font-JakartaSemiBold ">
            Create Your Account
          </Text>
          <Text className='text-lg font-Jakarta text-secondary-700'>
            Please enter your name, email and password to sign up
          </Text>

          <View className='gap-8 mt-5 border-b border-secondary-200 pb-14'>
            <InputField
              label='Name'
              placeholder='name'
              value={form.name}
              onChangeText={(value) => setForm({ ...form, name: value })}
              containerStyle="border-b-2 border-b-primary-700"
            />
            <InputField
              label='Email'
              placeholder='email'
              textContentType="emailAddress"
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
              containerStyle="border-b-2 border-b-primary-700"
            />
            <InputField
              label='Password'
              placeholder='password'
              isPassword
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
              containerStyle="border-b-2 border-b-primary-700"
            />

          </View>
          <View className=' mt-3 gap-8 border-b border-secondary-200 pb-14'>
            {/* start google , apple and facebook oauth button */}
            <OAuth />
            {/* end google , apple and facebook oauth button */}

          </View>
          <View className=' mt-3 '>
            <CustomButton
              title="Sign Up"
              onPress={onSignUpPress}
              className="mt-3 rounded-full"
            />
            {/* start link to switch sign in page  */}
            <Link
              href="/sign-in"
              className="text-lg text-center text-general-200 mt-10"
            >
              Already have an account?{" "}
              <Text className="text-primary-500">Log In</Text>
            </Link>
            {/* end link to switch sign in page  */}
          </View>
        </View>
        {/* end sign form */}

        {/* start verification modal for pending */}
        <ReactNativeModal isVisible={verification.state === "pending"}
          onModalHide={() =>
            setVerification({ ...verification, state: "success" })
          }
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold text-secondary-900 mb-2">
              Verification
            </Text>

            <Text className="font-Jakarta mb-5 text-secondary-800">
              we`ve sent verification code to {form.email}
            </Text>

            <OTPInputField
              label="Code"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) => setVerification({ ...verification, code })}
            />

            {verification.error && (
              <Text className="text-red-500 text-ms mt-1">
                {verification.error}
              </Text>
            )}

            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-success-500 rounded-full"
            />
          </View>

        </ReactNativeModal>
        {/* end verification modal for pending */}

        {/* start verification modal for success */}

        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={icons.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />

            <Text className="text-3xl font-JakartaBold text-center text-secondary-900">
              Verified
            </Text>
            <Text className="text-base font-Jakarta text-center mt-2 text-secondary-800">
              You have successfully verified your account
            </Text>

            <CustomButton
              title="Browse Home"
              onPress={() => router.replace("/(root)/(tabs)")}
              className="mt-5 rounded-full"
            />
          </View>
        </ReactNativeModal>

        {/* end verification modal for success*/}
      </View>
    </ScrollView>
  )
}

export default Signup