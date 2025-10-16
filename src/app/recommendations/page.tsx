import AppHeader from "@/components/app-header";
import RecommendationForm from "@/components/recommendation-form";
import { Wand2 } from "lucide-react";

export default function RecommendationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center bg-primary-foreground text-primary rounded-full p-3 mb-4 border border-primary/20">
                <Wand2 className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold font-headline">Personalized Recommendations</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Let our AI assistant help you discover your next favorite book.
                Enter a few titles you've enjoyed, and we'll suggest some new reads tailored just for you.
            </p>
        </div>

        <div className="max-w-2xl mx-auto mt-10">
            <RecommendationForm />
        </div>
      </main>
    </div>
  );
}
