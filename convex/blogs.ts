import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
})

export const getExplore = query({
    args: {
        query: v.string(),
        categories: v.optional(v.string()),
    },
    handler: async (ctx, { query, categories }) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) throw new Error("Unauthorized");

        if (query && categories) {
            return await ctx.db
                .query("blogs")
                .withSearchIndex("byTitle", (q) =>
                    q.search("title", query).eq("categories", categories)
                )
                .collect();
        }

        if (query) {
            return await ctx.db
                .query("blogs")
                .withSearchIndex("byTitle", (q) => q.search("title", query))
                .collect();
        }

        if (categories) {
            return await ctx.db
                .query("blogs")
                .withIndex("by_category", (q) => q.eq("categories", categories))
                .collect();
        }
    },
});

export const getAllBlogs = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) throw new Error("Unauthorized");

        return await ctx.db.query("blogs").order("desc").collect();
    },
});

export const addLikes = mutation({
    args: {
        blogId: v.id("blogs"),
    },
    handler: async (ctx, { blogId }) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) throw new Error("Unauthorized");

        const blogs = await ctx.db
            .query("blogs")
            .filter((q) => q.eq(q.field("_id"), blogId))

        const existingLike = await ctx.db
            .query("savedBlogs")
            .filter((q) => q.eq(q.field("blogId"), blogId))
            .filter((q) => q.eq(q.field("userId"), identity.subject))
            .unique();

        if (existingLike) {
            await ctx.db.delete(existingLike._id);

            // await ctx.db.patch(blogId, {
            //     likes: Math.max((existingLike.likes ?? 1) - 1, 0),
            // });
        }
    },
});

export const getBlogById = query({
    args: {
        id: v.id("blogs"),
    },
    handler: async (ctx, { id }) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) throw new Error("Unauthorized");

        return await ctx.db.get(id);
    },
});

export const getImageUrl = mutation({
    args: {
        storageId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId)
    }
})

export const createBlog = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        content: v.string(),
        coverImage: v.string(),
        author: v.object({
            id: v.string(),
            name: v.string(),
            image: v.string(),
        }),
        tags: v.array(v.string()),
        categories: v.optional(v.string()),
        likes: v.optional(v.number()), 
        publishedAt : v.string()
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) throw new Error("Unauthorized");

        if (identity.subject !== args.author.id) {
            throw new Error("Invalid author.");
        }

        return await ctx.db.insert("blogs", {
            title: args.title,
            slug: args.slug,
            content: args.content,
            coverImage: args.coverImage,
            author: args.author,
            tags: args.tags,
            categories: args.categories,
            isPublished: true,
            likes: args.likes ?? 0,
            publishedAt : args.publishedAt
        });
    },
});

