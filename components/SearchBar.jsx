"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import FavoriteButton from "./FavoriteButton"

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("search") || "")

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (query.trim()) {
        params.set("search", query.trim())
      } else {
        params.delete("search")
      }
      router.push("/?" + params.toString())
    }, 400)
    return () => clearTimeout(timer)
  }, [query, router, searchParams])

  return (
    <input
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search movies..."
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "0.5rem 1rem",
        color: "var(--text-main)",
        fontSize: "0.95rem",
        outline: "none",
        width: "min(320px, 100%)",
        transition: "border-color 0.2s",
      }}
      onFocus={e => e.target.style.borderColor = "var(--accent)"}
      onBlur={e => e.target.style.borderColor = "var(--border)"}
    />
  )
}

export function LoadMoreMovies({ query, initialPage, totalResults, initialMoviesCount }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialMoviesCount < totalResults);
  const [shouldLoadMore, setShouldLoadMore] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    setMovies([]);
    setPage(initialPage);
    setHasMore(initialMoviesCount < totalResults);
    setShouldLoadMore(false);
  }, [query, initialPage, totalResults, initialMoviesCount]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShouldLoadMore(true);
      } else {
        setShouldLoadMore(false);
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldLoadMore && !loading && hasMore) {
      const loadNext = async () => {
        setLoading(true);
        const nextPage = page + 1;
        
        // Dynamic import of getMovies to bypass circular dependency if any, or just use fetch
        const { getMovies } = await import("@/lib/api");
        const nextData = await getMovies(query, nextPage);
        const nextMovies = nextData?.movies;
        
        if (nextMovies && nextMovies.length > 0) {
          const newMoviesList = [...movies, ...nextMovies];
          setMovies(newMoviesList);
          setPage(nextPage);
          setHasMore(initialMoviesCount + newMoviesList.length < totalResults);
        } else {
          setHasMore(false);
        }
        
        setLoading(false);
        setShouldLoadMore(false);
      };
      
      loadNext();
    }
  }, [shouldLoadMore, loading, hasMore, query, page, movies, totalResults, initialMoviesCount]);

  return (
    <>
      {movies.map((movie, idx) => {
        // We dynamically import MovieCard or just require it to decouple. 
        // But we need to render it. We can just use the standard HTML.
        const hasPoster = movie.Poster && movie.Poster !== "N/A";
        return (
          <a
            key={movie.imdbID + "-" + idx}
            href={"/movie/" + movie.imdbID}
            style={{
              display: "block",
              background: "var(--bg-card)",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid var(--border)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
              textDecoration: "none",
            }}
          >
            <div style={{
              position: "relative",
              width: "100%",
              aspectRatio: "2/3",
              background: "var(--bg-card-hover)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3rem",
            }}>
              {hasPoster ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title + " poster"}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                "🎬"
              )}
              <FavoriteButton movie={movie} />
            </div>
            <div style={{ padding: "0.75rem" }}>
              <p style={{
                fontWeight: 700, fontSize: "0.85rem", lineHeight: 1.3,
                color: "var(--text-main)", marginBottom: "0.25rem",
                overflow: "hidden", display: "-webkit-box",
                WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
              }}>
                {movie.Title}
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                {movie.Year}
              </p>
            </div>
          </a>
        );
      })}
      
      {hasMore && (
        <div ref={observerRef} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", gridColumn: "1 / -1" }}>
          Loading more movies...
        </div>
      )}
    </>
  );
}
