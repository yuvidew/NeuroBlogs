import { useEffect, useState } from 'react'
import axios from "axios"
import { imagesListType } from '../../types/type';


/**
 * Custom React hook to fetch images from the Unsplash API based on a given category.
 *
 * @param category - The category or search query to fetch images for.
 * @returns An object containing the loading state and the list of fetched images.
 */
export const useFetchImages = (category: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [images, setImages] = useState<imagesListType[]>();
    
    /**
     * Custom React hook to fetch images from Unsplash based on a given category.
     *
     * @param category - The category or search term to query images for.
     * @returns An object containing the loading state and the fetched images list.
     *
     * @remarks
     * This hook automatically fetches images when the component mounts or when the category changes.
     *
     * @function onGetImages
     * Fetches images from the Unsplash API based on the current category.
     * @param none
     * @returns {Promise<void>} A promise that resolves when the images have been fetched and state updated.
     */

    const onGetImages = async () => {
        setLoading(true)
        try {
            const imgResponse = await axios.get('https://api.unsplash.com/search/photos', {
                params: {
                    query: `${category}`,
                    client_id: "l8DWdC0q_FXgM9ecvTP8FEGYDOOf_oN58Xyt5XO8Yyk"
                }
            });


            const imgList: imagesListType[] = imgResponse.data.results.map((result: { urls: { regular: string } }) => ({ img_url: result.urls?.regular || "" }));

            setImages(imgList)
        } catch (error) {
            console.log("Fetching images list error", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        onGetImages()
    } , [])
    
    return {loading , images}
}
