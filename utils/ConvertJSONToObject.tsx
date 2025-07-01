import { z } from "zod";

export const BlogSchema = z.object({
    title: z.string(),
    category: z.string(),
    content: z.string(),
    tags: z.array(z.string()),
    slug : z.string()
});

export const extractJsonFromText = (text: string) => {
    const match = text.match(/\{[\s\S]*\}/); // matches the first {...} block
    if (!match) throw new Error("No JSON object found");
    return match[0];
};
