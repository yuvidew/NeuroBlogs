import { ScrollView, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { imagesListType } from '../../types/type'

type RecommendedImgType = {
    loading: boolean,
    images: imagesListType[],
    onSelectImg : (value : string) => void
}

/**
 * Recommended component displays a horizontally scrollable list of recommended images.
 * Allows users to select an image by tapping on it.
 *
 * @param loading - Boolean indicating whether the images are currently loading.
 * @param images - Array of image objects to display, each containing an `img_url`.
 * @param onSelectImg - Callback function invoked with the selected image URL when an image is pressed.
 */


const Recommended = ({
    loading,
    images,
    onSelectImg
}: RecommendedImgType) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            // className="mb-32"
            contentContainerStyle={{ gap: 20, paddingHorizontal: 10 }}
        >
            {loading && 
                <View>
                </View>
            }
            {images.map(({ img_url }, i) => (
                <TouchableOpacity
                    key={i}
                    className=' h-full'
                    onPress={() => onSelectImg(img_url)}
                >
                    <Image
                        src={img_url}
                        className=' w-80 h-full object-contain'
                    />
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default Recommended