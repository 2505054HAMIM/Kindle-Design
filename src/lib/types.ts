export type Book = {
  id: string;
  title: string;
  author: string;
  authorBio: string;
  price: number;
  rating: number;
  ratingsCount: number;
  summary: string;
  coverImageId: string;
  genre: string;
};

export type Genre = {
  name: string;
  slug: string;
};
