import { GenerateBlogFormType } from "@/app/(root)/types/type";
import {create} from "zustand";

interface CreatedBlogStorageType {
    blog : GenerateBlogFormType,
    onBlog : (blog : GenerateBlogFormType) => void;
}

export const useCreatedBlogStorage = create<CreatedBlogStorageType>((set) => ({
    blog : {
        title : "",
        category : "",
        content : "",
        tags : [""],
        slug : ""
    },
    onBlog : (data) => set({blog : data})
}))