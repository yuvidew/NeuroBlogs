// import { ScrollView, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
// import React, { useState } from 'react';
// import { icons } from '@/constants/icons';
// import InputField from '@/components/InputField';
// import { RichEditor } from "react-native-pell-rich-editor"
// import ReactNativeModal from 'react-native-modal';
// import * as ImagePicker from 'expo-image-picker';
// import { useMutation } from 'convex/react';
// import { api } from '@/convex/_generated/api';
// import axios from "axios"

// const CreateBlog = () => {
//     const [fileResponse, setFileResponse] = useState<any>(null);
//     const [isVisible, setIsVisible] = useState<boolean>(false)
//     const [image, setImage] = useState<string | null>(null);
//     const generateUploadUrl = useMutation(api.blogs.generateUploadUrl);
//     const getImageUrl = useMutation(api.blogs.getImageUrl)

//     const onGenerateUrl = async (file: any) => {
//         try {
//             const url = await generateUploadUrl();
//             const response = await fetch(file.uri);
//             const blob = await response.blob();

//             const result = await fetch(url, {
//                 method: 'POST',
//                 headers: file.type
//                     ? { 'Content-Type': `${file.type}/*` }
//                     : {},
//                 body: blob,
//             });

//             const { storageId } = await result.json();
//             const imgUrl = await getImageUrl({ storageId: storageId });

//             console.log(imgUrl);

//             setImage(imgUrl || "");
//             setIsVisible(false)
//         } catch (error) {
//             console.log(error);
//             alert("Uploading error")
//         }
//     }


//     const onUploadImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ['images', 'videos'],
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });


//         if (!result.canceled) {
//             onGenerateUrl(result.assets[0].uri);
//         }
//     }

//     const onUploadCameraImage = async () => {
//         await ImagePicker.requestCameraPermissionsAsync()
//         let result = await ImagePicker.launchCameraAsync({
//             cameraType: ImagePicker.CameraType.front,
//             // mediaTypes: ['images', 'videos'],
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });


//         if (!result.canceled) {
//             onGenerateUrl(result.assets[0].uri);

//         }
//     }

//     const onRemoveImage = () => {
//         setImage(null);
//         setIsVisible(false)
//     }
//     return (
//         <ScrollView className=' bg-white px-5 py-10'>
//             {/* start to headline , save nad publish button */}
//             <View className=' flex flex-row items-center justify-between'>
//                 <Text className="font-JakartaBold text-2xl text-secondary-800">
//                     Create blog
//                 </Text>
//                 <View className=' flex flex-row items-center justify-end gap-4 ' >
//                     <TouchableOpacity onPress={() => { }} className=' px-5 py-2 rounded-full bg-primary-800 border border-primary-800 text-secondary-100'
//                     >
//                         <Text className='text-secondary-100 font-JakartaSemiBold text-md'>
//                             Save
//                         </Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress={() => { }} className=' px-5 py-2 rounded-full border border-primary-800 '
//                     >
//                         <Text className='text-primary-800 font-JakartaSemiBold text-md'>
//                             Publish
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             {/* end to headline , save nad publish button */}
//             <View className=' gap-4 pt-7'>
//                 {/* start to upload image */}
//                 {image ? (
//                     <View className="h-[30rem] relative rounded-lg  w-full ">
//                         <Image
//                             source={{ uri: image }}
//                             className="h-full w-full rounded-lg"
//                             resizeMode="cover"
//                         />
//                         <TouchableOpacity onPress={() => setIsVisible(true)} className=' p-3 h-14 w-14 absolute -right-2 -bottom-2 rounded-full flex-row items-center justify-center bg-primary-800' >
//                             <Image source={icons.edit} className=' size-5' tintColor={"#fff"} />
//                         </TouchableOpacity>
//                     </View>
//                 ) : (
//                     <TouchableOpacity onPress={() => setIsVisible(true)} className=' border border-secondary-200 bg-secondary-100 h-60 rounded-xl'>
//                         <View className=' items-center h-full justify-center gap-2'>
//                             <Image source={icons.uploadImage} tintColor={"#999999"} className='size-16' />
//                             <Text className=' text-md font-JakartaMedium text-secondary-600'>
//                                 Add blog cover image
//                             </Text>

//                         </View>
//                     </TouchableOpacity>
//                 )}


//                 <ReactNativeModal isVisible={isVisible} onModalHide={() => setIsVisible(false)}>
//                     <View className="bg-white px-7 py-9 rounded-2xl min-h-[200px] flex-col gap-5">
//                         <Text className="text-2xl font-JakartaExtraBold text-secondary-900 mb-2">
//                             Blog cover image
//                         </Text>

//                         <View className=' flex-row items-center justify-between' >
//                             <TouchableOpacity onPress={onUploadCameraImage} className=' bg-secondary-200  p-3 rounded-md flex-col gap-1 items-center justify-center '>
//                                 <Image source={icons.camera} className=' size-7' tintColor={"#8b5e34"} />
//                                 <Text className='text-secondary-800 text-sm font-JakartaMedium' >Camera</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity onPress={onUploadImage} className=' bg-secondary-200  p-3 rounded-md flex-col gap-1 items-center justify-center '>
//                                 <Image source={icons.gallery} className=' size-7' tintColor={"#8b5e34"} />
//                                 <Text className='text-secondary-800 text-sm font-JakartaMedium' >Gallery</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity className=' bg-secondary-200  p-3 rounded-md flex-col gap-1 items-center justify-center ' onPress={onRemoveImage}>
//                                 <Image source={icons.remove} className=' size-7' tintColor={"#8b5e34"} />
//                                 <Text className='text-secondary-800 text-sm font-JakartaMedium' >Remove</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </ReactNativeModal>
//                 {/* end to upload image */}

//                 {/* start to title input */}

//                 <View className=' flex flex-col gap-4' >
//                     <Text className='text-secondary-900 text-2xl font-JakartaSemiBold' >
//                         Title
//                     </Text>

//                     <TextInput className=' border border-secondary-200  rounded-lg px-3 placeholder:text-neutral-400' placeholder='Enter blog title..' />
//                 </View>
//                 {/* end to title input */}

//                 {/* start to content input */}
//                 <View className=' flex flex-col gap-4'>
//                     <Text className='text-secondary-900 text-2xl font-JakartaSemiBold' >
//                         Content
//                     </Text>

//                     {/* <RichEditor
//                         //   ref={(r) => this.richtext = r}
//                         initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
//                     //   editorInitializedCallback={() => this.onEditorInitialized()}
//                     /> */}
//                 </View>
//                 {/* end to content input */}
//             </View>
//         </ScrollView>
//     )
// }

// export default CreateBlog

import { View, Text } from 'react-native'
import React from 'react'

const CreateBlog = () => {
  return (
    <View>
      <Text>CreateBlog</Text>
    </View>
  )
}

export default CreateBlog