

import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '@/constants/icons'
import InputField from '@/components/InputField'
import SelectField from '../_components/SelectField'
import CustomButton from '@/components/CustomButton'
import { useAiGenerateBlog } from '../hooks/useAiGenerateBlog'
import { ReactNativeModal } from "react-native-modal"
import { Link } from 'expo-router'


const CreateBlog = () => {
  const { onGenerateBlog, loading, error, setError } = useAiGenerateBlog()
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    slug : "",
    tags : [""]
  })


  return (
    <SafeAreaView className=' bg-white h-full px-5 gap-9' >
      {/* start to header */}
      <View className=' gap-0'>
        <View className="flex-row items-center justify-between ">
          <View className="flex-row items-center gap-2 py-3">
            <Image source={icons.icon} className="size-10" />
            <Text className="font-JakartaBold text-2xl text-secondary-800">
              Create blog
            </Text>
          </View>
          <TouchableOpacity>
            <Image source={icons.more} className="size-7" />
          </TouchableOpacity>
        </View>

        {/* start to description */}
        <View>
          <Text className="text-lg font-Jakarta text-secondary-700">
            Let AI help you create engaging blogs and articles in minutes!
          </Text>
        </View>
        {/* end to description */}
      </View>
      {/* end to header */}

      {/* start to form */}
      <View className=' gap-6'>
        {/* start to title */}
        <InputField
          label="Title"
          placeholder='Blog title '
          textContentType="name"
          value={form.title}
          onChangeText={(value) => setForm({ ...form, title: value })}
          containerStyle=' border border-neutral-300 bg-neutral-100 rounded-md px-3 mt-3'
          labelStyle=' text-xl'
        />
        {/* end to title */}

        {/* start to select category */}
        <SelectField
          label='Select category'
          labelStyle=' text-xl'
          selectValue={form.category}
          onSelectValue={(value) => setForm({ ...form, category: value })}
        />
        {/* end to select category */}

        {/* start to Content */}
        <InputField
          label="Content"
          placeholder="Write your blog content..."
          textContentType="none"
          value={form.content}
          onChangeText={(value) => setForm({ ...form, content: value })}
          containerStyle="border border-neutral-300 bg-neutral-100 rounded-md px-3 mt-3"
          labelStyle="text-xl"
          inputStyle="font-JakartaMedium h-72 pt-3"
          multiline
          numberOfLines={6}
          style={{ textAlignVertical: "top" }}
        />

        {/* end to title */}
      </View>

      <CustomButton
        disabled={!form.category || !form.content || !form.title}
        title='Generate blog'
        IconLeft={<Image source={icons.ai} tintColor={"#fff"} className=' size-8 mr-1' />}
        className=' rounded-md'
        bgVariant={(!form.category || !form.content || !form.title) ? "secondary" : "primary"}
        loading={loading}
        onPress={() => onGenerateBlog(form)}
      />
      {/* end to form */}


      {/* start to modal */}
      <ReactNativeModal isVisible={!error.error}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Text className="text-2xl font-JakartaExtraBold text-secondary-900 mb-2">
            Error
          </Text>

          <Text className="font-Jakarta mb-5 text-red-500 text-ms mt-1">
            {error.message}
          </Text>

          <CustomButton
              title="Cancel"
              onPress={() => setError({error : true , message : ""})}
              className="mt-5 bg-secondary-900 rounded-full"
            />
        </View>
      </ReactNativeModal>
      {/* end to modal */}
    </SafeAreaView>
  )
}

export default CreateBlog