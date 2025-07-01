import { Text, TouchableOpacity } from 'react-native'
import React from 'react';
import { ButtonProps } from '@/types/type';
import Spinner from './Spinner';


/**
 * Returns the Tailwind CSS background style class based on the provided background variant.
 *
 * @param variant - The background color variant of the button. Can be 'primary', 'secondary', 'danger', 'success', or 'outline'.
 * @returns The corresponding Tailwind CSS class for the background style.
 */

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
    switch (variant) {
        case "secondary":
            return "bg-primary-200";
        case "danger":
            return "bg-red-500";
        case "success":
            return "bg-green-500";
        case "outline":
            return "bg-transparent ";
        default:
            return "bg-primary-700";
    }
};


/**
 * Returns the Tailwind CSS text color class based on the provided text variant.
 *
 * @param variant - The text color variant of the button. Can be 'primary', 'secondary', 'danger', 'success', or 'default'.
 * @returns The corresponding Tailwind CSS class for the text color.
 */

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
    switch (variant) {
        case "primary":
            return "text-primary-700";
        case "secondary":
            return "text-gray-100";
        case "danger":
            return "text-red-100";
        case "success":
            return "text-green-100";
        default:
            return "text-white";
    }
};

/**
 * CustomButton is a reusable button component for React Native applications.
 * It supports multiple background and text color variants, optional left and right icons,
 * and custom styling via className. The button uses TouchableOpacity for press handling.
 *
 * @param {() => void} onPress - Function to call when the button is pressed.
 * @param {string} title - The text to display inside the button.
 * @param {'primary' | 'secondary' | 'danger' | 'success' | 'outline'} [bgVariant='primary'] - The background color variant of the button.
 * @param {'primary' | 'secondary' | 'danger' | 'success' | 'default'} [textVariant='default'] - The text color variant of the button.
 * @param {React.ReactNode} [IconLeft] - Optional icon component to display on the left side of the button text.
 * @param {React.ReactNode} [IconRight] - Optional icon component to display on the right side of the button text.
 * @param {string} [className] - Additional Tailwind CSS classes to apply to the button.
 * @param {object} [props] - Additional props passed to TouchableOpacity.
 */


const CustomButton = ({
    onPress,
    title,
    bgVariant = "primary",
    textVariant = "default",
    IconLeft,
    IconRight,
    className,
    loading = false,
    disabled,
    ...props
}: ButtonProps) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            className={` p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 h-16 ${getBgVariantStyle(bgVariant)} ${className} ${disabled  ? "opacity-45" : ""}`}
            {...props}
            // disabled = {true}
        >
            {loading ?
                <Spinner loading = {loading} />
                :
                <>
                    {IconLeft}
                    <Text className={`text-lg font-JakartaBold ${getTextVariantStyle(textVariant)}`} >{title}</Text>
                    {IconRight && <IconRight />}
                </>
            }
        </TouchableOpacity>
    )
}

export default CustomButton