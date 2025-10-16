import { notFound } from "next/navigation";
import Image from "next/image";
import { books } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import AppHeader from "@/components/app-header";
import { Separator } from "@/components/ui/separator";
import StarRating from "@/components/star-rating";
import BuyButton from "@/components/buy-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookPageProps {
  params: {
    id: string;
  };
}

export default function BookPage({ params }: BookPageProps) {
  const book = books.find((b) => b.id === params.id);

  if (!book) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === book.coverImageId);

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-1 lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-0">
                  <div className="relative aspect-[2/3] w-full">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={`Cover of ${book.title}`}
                        fill
                        className="object-cover rounded-lg"
                        data-ai-hint={image.imageHint}
                        priority
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <Badge variant="secondary" className="mb-2">{book.genre}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold font-headline leading-tight">
              {book.title}
            </h1>
            <p className="text-xl text-muted-foreground mt-2">by {book.author}</p>

            <div className="flex items-center gap-2 mt-4">
              <StarRating rating={book.rating} />
              <span className="text-muted-foreground text-sm">
                ({book.ratingsCount.toLocaleString()} ratings)
              </span>
            </div>

            <Separator className="my-8" />
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border rounded-lg bg-card">
              <p className="text-3xl font-bold text-primary">${book.price.toFixed(2)}</p>
              <div className="w-full md:w-auto md:max-w-xs">
                <BuyButton bookTitle={book.title} />
              </div>
            </div>

            <div className="prose prose-lg max-w-none mt-8 font-body text-foreground/90">
                <h2 className="font-headline text-2xl font-bold border-b pb-2">Summary</h2>
                <p>{book.summary}</p>
                <h2 className="font-headline text-2xl font-bold border-b pb-2 mt-8">About the Author</h2>
                <p>{book.authorBio}</p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return books.map((book) => ({
    id: book.id,
  }));
}
