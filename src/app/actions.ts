"use server";

import { getPersonalizedRecommendations } from "@/ai/flows/personalized-recommendations";
import { z } from "zod";

const schema = z.object({
  readingHistory: z.string().min(1, { message: "Reading history is required." }),
});

export type FormState = {
  message: string;
  recommendations: string[] | null;
};

export async function getRecommendationsAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    readingHistory: formData.get("readingHistory"),
  });

  if (!validatedFields.success) {
    return {
      message: "Please enter some books you've read.",
      recommendations: null,
    };
  }
  
  try {
    const result = await getPersonalizedRecommendations(validatedFields.data);
    const recommendations = result.recommendations.split(',').map(r => r.trim()).filter(Boolean);
    if (recommendations.length > 0) {
        return { message: "success", recommendations };
    }
    return { message: "Could not generate recommendations based on your input. Try being more specific.", recommendations: null };
  } catch (e) {
    return { message: "An error occurred. Please try again later.", recommendations: null };
  }
}
