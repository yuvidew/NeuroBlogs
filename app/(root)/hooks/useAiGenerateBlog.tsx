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
            const prompt = `Generate a blog post as a JSON object matching this interface:
            {
                "title": string,
                "category": string,
                "content": string
            }

            Use the following details:
            - Title: ${form.title}
            - Category: ${form.category}
            - Guidelines/Topics: ${form.content}

            Requirements:
            1. Output valid JSON only (no extra text).
            2. Make the content easy to read with clear headings (e.g., "## Introduction").
            3. Include bullet points to highlight key points or takeaways.

            Example output structure:
            {
            "title": "...",
            "category": "...",
            "content": "## Introduction\n...\n\n- Point one\n- Point two\n\n## Conclusion"
            }

            Now, create the blog post based on the inputs above.`;
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
                onBlog(validated);
                // console.log("validated" , validated);
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
                content: ""
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

    return { onGenerateBlog, loading , error , setError};
};
