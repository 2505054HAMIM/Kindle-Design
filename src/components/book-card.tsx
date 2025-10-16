import Link from "next/link";
import Image from "next/image";
import { Book } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StarRating from "./star-rating";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === book.coverImageId);

  return (
    <Link href={`/book/${book.id}`} className="group">
      <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-[2/3] w-full">
            {image && (
              <Image
                src={image.imageUrl}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover rounded-t-lg"
                data-ai-hint={image.imageHint}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="text-lg leading-tight font-headline group-hover:text-primary transition-colors duration-200">
            {book.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <StarRating rating={book.rating} />
          <p className="font-bold text-primary">${book.price.toFixed(2)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
