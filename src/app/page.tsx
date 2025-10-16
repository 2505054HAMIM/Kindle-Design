"use client";

import * as React from "react";
import { Book as BookType, Genre, books, genres } from "@/lib/data";
import AppHeader from "@/components/app-header";
import BookCard from "@/components/book-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedGenre, setSelectedGenre] = React.useState<string | null>(null);

  const filteredBooks = React.useMemo(() => {
    return books.filter((book) => {
      const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
      const matchesSearch =
        searchTerm.trim() === ""
          ? true
          : book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesGenre && matchesSearch;
    });
  }, [searchTerm, selectedGenre]);

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-8">
          <aside className="md:col-span-1 lg:col-span-1">
            <h2 className="text-xl font-bold mb-4 font-headline">Genres</h2>
            <div className="flex flex-col space-y-2">
              <Button
                variant={!selectedGenre ? "secondary" : "ghost"}
                className={cn("justify-start", !selectedGenre ? "font-bold" : "")}
                onClick={() => setSelectedGenre(null)}
              >
                All Genres
              </Button>
              {genres.map((genre: Genre) => (
                <Button
                  key={genre.slug}
                  variant={selectedGenre === genre.name ? "secondary" : "ghost"}
                  className={cn("justify-start", selectedGenre === genre.name ? "font-bold" : "")}
                  onClick={() => setSelectedGenre(genre.name)}
                >
                  {genre.name}
                </Button>
              ))}
            </div>
          </aside>
          <section className="md:col-span-3 lg:col-span-4">
            <h2 className="text-2xl font-bold mb-6 font-headline">
              {selectedGenre || "All Books"}
            </h2>
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book: BookType) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-96 bg-card rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-2">No Books Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or genre filter.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Ember Reads. All Rights Reserved.
      </footer>
    </div>
  );
}
