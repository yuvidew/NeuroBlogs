import { View, Text, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';
import categories from "@/data/categories.json"

/**
 * A reusable select field component for React Native, allowing users to pick a value from a dropdown list.
 *
 * @param {string} [labelStyle] - Optional custom styles for the label text.
 * @param {string} label - The label displayed above the select field.
 * @param {string} selectValue - The currently selected value in the picker.
 * @param {(value: string) => void} onSelectValue - Callback function invoked when a new value is selected.
 */
const SelectField = ({
    labelStyle,
    label,
    selectValue,
    onSelectValue
}: {
    labelStyle?: string,
    label: string,
    selectValue: string,
    onSelectValue: (value: string) => void
}) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View className=' w-full'>
                    <Text className={`text-md font-JakartaSemiBold text-secondary-800 ${labelStyle}`}>
                        {label}
                    </Text>
                    <View className="bg-neutral-100 rounded-md border mt-3 border-neutral-300">
                        <Picker
                            selectedValue={selectValue}
                            onValueChange={(itemValue) => onSelectValue(itemValue)}
                            style={{
                                height: 50,
                                fontSize: 16,
                                color: '#1C1C1E', 
                                fontFamily: 'JakartaMedium',
                            }}
                            placeholder='select categories'
                        >
                            <Picker.Item label="Select categories" />
                            {categories.map((item , index) => (
                                <Picker.Item 
                                    key={index} 
                                    label={item.category} 
                                    value={item.category}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SelectField