import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect } from "react";
import { icons } from "@/constants/icons";
import { useSSO } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { router } from "expo-router";


/**
 * Custom hook to warm up the Expo WebBrowser when the component mounts,
 * and cool it down when the component unmounts.
 * This can help improve the performance of OAuth flows by reducing the time
 * it takes to open the browser.
 *
 * @remarks
 * This hook does not take any parameters.
 */


const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};


/**
 * OAuth component provides social sign-in buttons for Google, Apple, and Facebook.
 * It uses Clerk's SSO flow and Expo's WebBrowser to handle OAuth authentication.
 * 
 * @returns {JSX.Element} A view containing OAuth provider buttons for user authentication.
 */



const OAuth = () => {
    useWarmUpBrowser();
    const { startSSOFlow } = useSSO();

    // this function is help to sign in with google 
    const onGooglePress = useCallback(async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy: "oauth_google",
                redirectUrl: AuthSession.makeRedirectUri(),
            });

            if (createdSessionId) {
                await setActive!({ session: createdSessionId });
                router.replace("/(root)/(tabs)");
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    }, [startSSOFlow]);

    // this function is help to sign in with apple 
    const onApplePress = useCallback(async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy: "oauth_apple",
                redirectUrl: AuthSession.makeRedirectUri(),
            });

            if (createdSessionId) {
                await setActive!({ session: createdSessionId });
                router.replace("/(root)/(tabs)");
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    }, [startSSOFlow]);

    // this function is help to sign in with facebook 
    const onFacebookPress = useCallback(async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy: "oauth_facebook",
                redirectUrl: AuthSession.makeRedirectUri(),
            });

            if (createdSessionId) {
                await setActive!({ session: createdSessionId });
                router.replace("/(root)/(tabs)");
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    }, [startSSOFlow]);

    return (
        <View>
            <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
                <View className="flex-1 h-[1px] bg-secondary-200" />
                <Text className="text-lg">Or continue with</Text>
                <View className="flex-1 h-[1px] bg-secondary-200" />
            </View>
            <View className="flex-row items-center justify-between gap-5 mt-5">
                <TouchableOpacity 
                    className=" w-[30%] border border-secondary-200 p-3 flex items-center justify-center rounded-full h-14"
                    onPress={onGooglePress}
                >
                    <Image source={icons.google} className="size-5" />
                </TouchableOpacity>
                <TouchableOpacity 
                    className=" w-[30%] border border-secondary-200 p-3 flex items-center justify-center rounded-full h-14"
                    onPress={onApplePress}
                >
                    <Image source={icons.apple} className="size-5" />
                </TouchableOpacity>
                <TouchableOpacity 
                    className=" w-[30%] border border-secondary-200 p-3 flex items-center justify-center rounded-full h-14"
                    onPress={onFacebookPress}
                >
                    <Image source={icons.facebook} className="size-5" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OAuth;
