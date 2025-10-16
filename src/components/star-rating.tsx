import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export default function StarRating({ rating, maxRating = 5, className }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 text-accent fill-accent" />
      ))}
      {halfStar && (
        <div className="relative">
            <Star key="half" className="w-4 h-4 text-accent" />
            <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                <Star className="w-4 h-4 text-accent fill-accent" />
            </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-accent" />
      ))}
    </div>
  );
}
