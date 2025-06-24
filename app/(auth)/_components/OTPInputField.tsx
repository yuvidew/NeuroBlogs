import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Platform,
    Keyboard,
} from "react-native";
import React from "react";
import { InputFieldProps } from "@/types/type";


/**
 * OTPInputField is a customizable input component for entering OTP (One-Time Password) codes.
 * It supports optional icons, secure text entry, and various style overrides.
 *
 * @param {string} label - The label text displayed above the input field.
 * @param {string} [labelStyle] - Additional Tailwind classes for customizing the label style.
 * @param {string} [placeholder] - Placeholder text for the input field.
 * @param {ImageSourcePropType} [icon] - Optional icon to display inside the input field.
 * @param {string} [value] - The current value of the input field.
 * @param {string} [className] - Additional Tailwind classes for the root component.
 * @param {string} [inputStyle] - Additional Tailwind classes for the TextInput component.
 * @param {string} [containerStyle] - Additional Tailwind classes for the input container.
 * @param {string} [iconStyle] - Additional Tailwind classes for the icon.
 * @param {boolean} [secureTextEntry=false] - If true, masks the input text (for passwords/OTP).
 * @param {object} [props] - Additional props passed to the TextInput component.
 * @returns {JSX.Element} The rendered OTP input field component.
 */

const OTPInputField = ({
    label,
    labelStyle,
    placeholder,
    icon,
    value,
    className,
    inputStyle,
    containerStyle,
    iconStyle,
    secureTextEntry = false,
    ...props
}: InputFieldProps) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="my-2 w-full">
                    <Text className={` text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
                        {label}
                    </Text>
                    <View className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-md border border-neutral-100 focus:border-primary-500 ${containerStyle}`}>
                        {icon && (
                            <Image
                                source={icon}
                                className={` size-6 ml-6 ${iconStyle}`}
                                tintColor={"#808080"}
                            />
                        )}
                        <TextInput
                            className={`rounded-md p-4 font-JakartaSemiBold placeholder:text-neutral-400 text-[15px] flex-1 ${inputStyle} text-left`}
                            secureTextEntry = {secureTextEntry}
                            placeholder={placeholder}
                            {...props}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default OTPInputField;
