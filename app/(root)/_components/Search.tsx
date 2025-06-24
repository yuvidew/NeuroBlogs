import React, { useState } from "react";
import { View, Image, TextInput } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import {icons} from "@/constants/icons";
import { useLocalSearchParams, router } from "expo-router";

/**
 * @param {object} props - Component props (none used).
 * @returns {JSX.Element} Search input component for filtering blogs.
 */

const Search = () => {
    const params = useLocalSearchParams<{ query?: string }>();
    const [search, setSearch] = useState(params.query);

    const debouncedSearch = useDebouncedCallback((text: string) => {
        router.setParams({ query: text });
    }, 500);

    const onSearch = (text: string) => {
        setSearch(text);
        debouncedSearch(text);
    };

    return (
        <View className="flex flex-row items-center justify-between px-3 rounded-lg bg-secondary-100 border border-blue-100/20 mt-5 py-2">
            <View className="flex-1 flex flex-row items-center justify-start z-50">
                <Image source={icons.search} className="size-4" />
                <TextInput
                    value={search}
                    onChangeText={onSearch}
                    placeholder="Search for blogs"
                    className="text-sm font-rubik text-black-300 ml-2 flex-1"
                />
            </View>
        </View>
    );
};

export default Search;