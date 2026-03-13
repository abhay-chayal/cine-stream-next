import { getMovies } from "@/lib/api";
import MovieCard from "@/components/MovieCard";
import { LoadMoreMovies } from "@/components/SearchBar";
import { Suspense } from "react";

export const metadata = {
  title: "Popular Movies",
  description: "Browse popular movies on Cine-Stream",
};

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const query = params?.search || "Avengers";
  const { movies, totalResults } = await getMovies(query);

  return (
    <div style={{ padding: "2rem 1.5rem" }}>
      {movies.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "5rem 1rem",
            color: "var(--text-muted)",
          }}
        >
          <p style={{ fontSize: "3rem" }}>🎬</p>
          <p style={{ fontSize: "1.25rem", marginTop: "1rem" }}>
            No results found for &quot;{query}&quot;
          </p>
          <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
            Try a different search term.
          </p>
        </div>
      ) : (
        <>
          <p
            style={{
              marginBottom: "1.5rem",
              color: "var(--text-muted)",
              fontSize: "0.9rem",
            }}
          >
            Showing results for{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>
              &quot;{query}&quot;
            </span>
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}

            {/* Suspense Fix */}
            <Suspense fallback={<p>Loading more movies...</p>}>
              <LoadMoreMovies
                query={query}
                initialPage={1}
                totalResults={totalResults}
                initialMoviesCount={movies.length}
              />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}
