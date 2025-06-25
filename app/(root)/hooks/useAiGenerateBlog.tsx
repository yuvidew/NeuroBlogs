import { useState } from "react";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { GenerateBlogFormType } from "../types/type";

if (typeof structuredClone === "undefined") {
    (globalThis as any).structuredClone = function <T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    };
}



//TODO : check the api key
const google = createGoogleGenerativeAI({
    apiKey: "AIzaSyBmpGXE75P5FY5WcDd5JNg_vE_N8YvuyUQ",
});
/**
 * Custom React hook to generate a blog post using an AI model (Google Gemini).
 * Handles loading state and provides a function to trigger blog generation based on form input.
 *
 * @returns {Object} An object containing:
 *   - onGenerateBlog: Function to generate a blog post from the provided form data.
 *   - loading: Boolean indicating if the generation is in progress.
 *
 * @param {GenerateBlogFormType} form - The form data containing title, category, and content guidelines/topics for the blog post.
 */

export const useAiGenerateBlog = () => {
    const [loading, setLoading] = useState<boolean>(false);
    /**
     * Custom React hook for generating a blog post using an AI model.
     *
     * This hook provides a function to generate a blog post based on user input,
     * sending a prompt to an AI model and handling the loading state.
     *
     * @returns {Object} An object containing:
     *   - onGenerateBlog: Function to trigger blog generation.
     *   - loading: Boolean indicating if the generation is in progress.
     *
     * @remarks
     * The generated blog post is expected to be a JSON object with `title`, `category`, and `content` fields.
     *
     * @example
     * const { onGenerateBlog, loading } = useAiGenerateBlog();
     * onGenerateBlog({ title: "AI in 2024", category: "Technology", content: "Latest trends..." });
     *
     * @param onGenerateBlog - Function to generate a blog post.
     * @param onGenerateBlog.form - The form data containing title, category, and content guidelines.
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

            console.log("the generated result", response.text);

            //TODO : to add the response.text in the zustand

        } catch (error) {
            console.log("send error from :", error);
        } finally {
            setLoading(false)
        }
    };
    return { onGenerateBlog, loading };
};
