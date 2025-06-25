

import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '@/constants/icons'
import InputField from '@/components/InputField'
import SelectField from '../_components/SelectField'
import CustomButton from '@/components/CustomButton'
import { useAiGenerateBlog } from '../hooks/useAiGenerateBlog'

//TODO : add the redirect function which is redirect the publice pa

const CreateBlog = () => {
  const {onGenerateBlog , loading} = useAiGenerateBlog()
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: ""
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
          onSelectValue={(value) => setForm({...form , category : value})}
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
          style = {{textAlignVertical : "top"}}
        />

        {/* end to title */}
      </View>

      <CustomButton
        disabled = {!form.category || !form.content || !form.title}
        title='Generate blog'
        IconLeft={<Image source={icons.ai} tintColor={"#fff"} className=' size-8 mr-1' />}
        className=' rounded-md'
        bgVariant={(!form.category || !form.content || !form.title) ? "secondary" : "primary"}
        loading = {loading}
        onPress={() => onGenerateBlog(form)}
      />
      {/* end to form */}
    </SafeAreaView>
  )
}

export default CreateBlog