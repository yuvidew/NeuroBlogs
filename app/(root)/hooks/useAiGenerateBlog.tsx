import { useState } from "react";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { GenerateBlogFormType } from "../types/type";
import { useCreatedBlogStorage } from "@/store/useCreatedBlogStorage";
import { BlogSchema, extractJsonFromText } from "@/utils/ConvertJSONToObject";
import { router } from "expo-router";

if (typeof structuredClone === "undefined") {
    (globalThis as any).structuredClone = function <T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    };
}



const google = createGoogleGenerativeAI({
    apiKey: "AIzaSyBmpGXE75P5FY5WcDd5JNg_vE_N8YvuyUQ",
});


/**
 * Custom React hook to generate a blog post using AI (Google Gemini model).
 * 
 * This hook provides a function to generate a blog post based on user input,
 * validates the AI output against a schema, and manages loading and error states.
 * 
 * @returns {Object} An object containing:
 *   - onGenerateBlog: Function to trigger blog generation.
 *   - loading: Boolean indicating if generation is in progress.
 *   - error: Error state object with `error` and `message`.
 *   - setError: Function to manually set the error state.
 * 
 * @param {GenerateBlogFormType} form - The form data containing title, category, and content guidelines for the blog post.
 */



export const useAiGenerateBlog = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ error: boolean, message: string }>({ error: true, message: "" })
    const { onBlog } = useCreatedBlogStorage()

    /**
     * Custom React hook for generating a blog post using an AI model based on user-provided form data.
     * Handles loading state, error management, and blog validation/storage.
     *
     * @returns {Object} An object containing:
     *   - onGenerateBlog: Function to trigger blog generation from form input.
     *   - loading: Boolean indicating if the generation is in progress.
     *   - error: Error state and message.
     *   - setError: Function to manually set the error state.
     *
     * @param onGenerateBlog - (form: GenerateBlogFormType) => Promise<void>
     *   Triggers the AI blog generation process.
     *   @param form - The form data containing title, category, and content guidelines for the blog post.
     */

    const onGenerateBlog = async (form: GenerateBlogFormType) => {
        setLoading(true);
        try {
            const prompt = `You are an AI writing assistant. Generate a blog post in valid JSON format with the following structure:

            {
            "title": string,
            "slug": string,
            "category": string,
            "tags": string[],
            "content": string
            }

            Input:
            - Title: ${form.title}
            - Category: ${form.category}
            - Guidelines/Topics: ${form.content}

            Instructions:
            1. Return ONLY valid JSON (no commentary or explanation).
            2. The "content" must be in Markdown (## Headings, - Bullet points).
            3. Begin with a "## Introduction".
            4. Include relevant headings and a "## Conclusion".
            5. Keep the tone friendly and beginner/intermediate-friendly.
            6. "tags" should be an array like ["JavaScript", "Frontend"].
            7. Generate a URL-friendly "slug" from the title (e.g., lowercase, hyphen-separated).

            Example Output:
            {
            "title": "Understanding JavaScript Closures",
            "slug": "understanding-javascript-closures",
            "category": "Programming",
            "tags": ["JavaScript", "Functions", "Web Development"],
            "content": "## Introduction\\nJavaScript closures are...\\n\\n## Key Concepts\\n- Functions can remember...\\n\\n## Conclusion\\nClosures are essential for..."
            }

            Generate the blog based on the inputs above. Output only valid JSON.`;

            const response = await generateText({
                model: google("gemini-1.5-flash"),
                prompt,
            });


            const rawText = response.text;

            let parsed;
            try {
                const jsonText = extractJsonFromText(rawText);
                parsed = JSON.parse(jsonText);
            } catch (jsonError) {
                setError({
                    error: false,
                    message: "Failed to parse JSON from AI output."
                })
                console.log(`Failed to parse JSON from AI output. Raw output: ${rawText}`);
            }

            try {
                const validated = BlogSchema.parse(parsed);
                console.log("validated" , validated);
                onBlog(validated);
                router.replace("/(root)/publish-blog/publish-blog")
            } catch (zodError) {
                setError({
                    error: false,
                    message: "JSON shape is invalid."
                })
                console.log(`JSON shape is invalid: ${JSON.stringify(parsed)}`);
            }
        } catch (error) {
            onBlog({
                title: "",
                category: "",
                content: "",
                tags : [""],
                slug : ""
            })

            setError({
                error: false,
                message: "Failed to generate blog."
            })
            console.log("send error from :", error);
        } finally {
            setLoading(false)
        }
    };

    return { onGenerateBlog, loading, error, setError };
};
