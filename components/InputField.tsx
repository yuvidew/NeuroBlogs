import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Platform,
    Keyboard,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { InputFieldProps } from "@/types/type";
import { icons } from "@/constants/icons";


/**
 * Renders a customizable input field component with optional password visibility toggle.
 *
 * @param {InputFieldProps} props - The props for the InputField component.
 * @param {string} props.label - The label text displayed above the input field.
 * @param {string} [props.labelStyle] - Additional styles for the label text.
 * @param {string} [props.placeholder] - Placeholder text for the input field.
 * @param {boolean} [props.isPassword=false] - If true, enables password visibility toggle.
 * @param {string} [props.value] - The value of the input field.
 * @param {string} [props.className] - Additional class names for the input field container.
 * @param {string} [props.inputStyle] - Additional styles for the TextInput component.
 * @param {string} [props.containerStyle] - Additional styles for the input container.
 * @param {string} [props.iconStyle] - Additional styles for the visibility toggle icon.
 * @param {boolean} [props.secureTextEntry=false] - If true, masks the input text.
 * @param {string} [props.textContentType] - The content type for the TextInput (e.g., "password", "emailAddress").
 * @param {...any} [props.props] - Additional props passed to the TextInput component.
 * @returns {JSX.Element} The rendered InputField component.
 */

const InputField = ({
    label,
    labelStyle,
    placeholder,
    isPassword = false,
    value,
    className,
    inputStyle,
    containerStyle,
    iconStyle,
    secureTextEntry = false,
    textContentType,
    ...props
}: InputFieldProps) => {
    const [isShow, setIsShow] = useState(false);
    const isSecure = isPassword ? !isShow : false;
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className=" w-full">
                    <Text className={` text-md font-JakartaSemiBold text-secondary-800 ${labelStyle}`}>
                        {label}
                    </Text>
                    <View className={`flex flex-row justify-start items-center relative ${containerStyle}`}>
                        <TextInput
                            className={`rounded-md py-4 font-JakartaSemiBold placeholder:text-neutral-400 text-xl flex-1 ${inputStyle} text-left`}
                            placeholder={placeholder}
                            secureTextEntry={isSecure}
                            textContentType={isPassword ? "password" : textContentType}
                            {...props}
                        />
                        {isPassword && (
                            <TouchableOpacity onPress={() => setIsShow(!isShow)}>
                                <Image
                                    source={!isShow ? icons.closeEye : icons.openEye}
                                    className={` size-6  `}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default InputField;
