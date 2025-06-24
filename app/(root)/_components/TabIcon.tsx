import { View, Text , Image} from 'react-native'
import React from 'react'
import { TabIconProps } from '../types/type';


/**
 * Renders a tab icon with an optional title for use in a tab navigation bar.
 *
 * @param {TabIconProps} props - The props for the TabIcon component.
 * @param {boolean} props.focused - Determines if the tab is currently focused/active.
 * @param {ImageSourcePropType} props.icon - The source for the icon image.
 * @param {string} [props.title] - Optional title to display below the icon.
 * @param {string} [props.size="size-6"] - Optional size class for the icon image.
 * @returns {JSX.Element} The rendered tab icon component.
 */

const TabIcon = ({
    focused,
    icon,
    title,
    size = "size-6"
}: TabIconProps) => (
    <View className="flex-1 mt-3 flex flex-col items-center">
        <Image
            source={icon}
            tintColor={focused ? "#8b5e34" : "#666876"}
            resizeMode="contain"
            className={size}
        />
        {title && (
            <Text
                className={`${focused ? "text-primary-700 font-medium" : "text-secondary-700"} text-xs text-center mt-1 w-full`}
            >
                {title}
            </Text>
        )}
    </View>
);

export default TabIcon