import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    blogs : defineTable({
        title: v.string(),
        slug : v.string(),
        content: v.string(),
        coverImage: v.string(),
        author : v.object({
            id: v.string(),
            name: v.string(),
            image: v.string(),
        }),
        tags : v.array(v.string()),
        categories : v.optional(v.string()),
        isPublished: v.boolean(),
        publishedAt : v.string(),
        likes : v.number()

    })
    .index("by_title" , ["title"])
    .index("by_category" , ["categories"])
    .searchIndex("byTitle", {
        searchField : "title",
        filterFields : ["categories"]
    }),

    savedBlogs: defineTable({
        userId: v.string(),
        blogId: v.string(),
    })
    .index("by_blogId" , ["blogId"])
    ,


    likes : defineTable({
        userId: v.string(),
        blogId: v.string(),
    })
})