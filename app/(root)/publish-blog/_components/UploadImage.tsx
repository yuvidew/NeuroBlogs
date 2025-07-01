import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants/icons'
import ReactNativeModal from 'react-native-modal';
import Recommended from './Recommended';
import { useFetchImages } from '../hooks/useFetchImages';
import { imagesListType } from '../../types/type';

const UploadImage = ({
    category,
    onSelectImg,
    selectImg
} : {
    selectImg : string,
    category : string,
    onSelectImg : (value : string) => void;
}) => {
    const [isModal , setIsModal] = useState(false);
    const {loading , images} = useFetchImages(category)
    return (
        <>
            {selectImg ? 
                <View className=' relative h-72 w-full  rounded-lg'>
                    <Image 
                        src={selectImg}
                        className='w-full h-full rounded-lg'
                    />

                    <TouchableOpacity 
                        className = " bg-primary-800 p-2 rounded-lg absolute right-0 -bottom-3"
                        onPress={() => setIsModal(true)}
                    >
                        <Image
                            source={icons.ImgEdit}
                            className='size-7'
                            tintColor={"#fff"}
                        />
                    </TouchableOpacity>
                </View> 
                : 
                <View className=' border border-neutral-300 bg-neutral-200 rounded-lg h-72 flex  items-center justify-center'>
                    <TouchableOpacity onPress={() => setIsModal(true)} className=' p-2 border flex flex-row items-center gap-2 border-neutral-300 rounded-lg'>
                        <Image source={icons.uploadImage} tintColor={"#737373"} className='size-6 mt-1' />
                        <Text className=' text-neutral-500 font-Jakarta'>Upload image</Text>
                    </TouchableOpacity>
                </View>
            }

            <ReactNativeModal isVisible = {isModal} >
                <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                    {/* start to tabs */}
                    <View className=' flex-row items-center gap-5'>
                        <TouchableOpacity 
                            className={` py-3 border-b border-primary-800`}
                        >
                            <Text className={` font-JakartaSemiBold text-primary-700`}>
                                Recommended 
                            </Text>
                        </TouchableOpacity>
                        
                    </View>
                    {/* end to tabs */}

                    {/* start to show recommended and upload image comp */}
                    <View className=' py-5 h-[19rem]'>
                        <Recommended
                            images={images as imagesListType[]}
                            loading = {loading}
                            onSelectImg = {
                                (value) => {
                                    onSelectImg(value)
                                    setIsModal(false)
                            }}
                        /> 
                    </View>
                    {/* end to show recommended and upload image comp */}
                </View>
            </ReactNativeModal>
        </>
    )
}

export default UploadImage