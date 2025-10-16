"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getRecommendationsAction, FormState } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Lightbulb, BookCheck } from "lucide-react";

const initialState: FormState = {
  message: "",
  recommendations: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        "Get Recommendations"
      )}
    </Button>
  );
}

export default function RecommendationForm() {
  const [state, formAction] = useFormState(getRecommendationsAction, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Your Reading History</CardTitle>
        <CardDescription>
          Enter the titles of some books you've read, separated by commas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <Textarea
            name="readingHistory"
            placeholder="e.g., The Hobbit, Dune, Pride and Prejudice"
            rows={4}
            required
          />
          <SubmitButton />
        </form>

        {state.message && state.message !== "success" && (
            <Alert variant="destructive" className="mt-6">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
            </Alert>
        )}

        {state.recommendations && state.recommendations.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold font-headline mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-accent"/>
              Here are some books you might like:
            </h3>
            <ul className="space-y-3">
              {state.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-background rounded-md border">
                  <BookCheck className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span className="font-medium">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
