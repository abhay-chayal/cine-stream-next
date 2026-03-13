"use client";

import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const loadFavorites = () => {
    const savedFavs = JSON.parse(localStorage.getItem("cinestream_favorites") || "[]");
    setFavorites(savedFavs);
  };

  useEffect(() => {
    if (!mounted) return;
    
    // Initial load
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFavorites();

    // Listen for changes from other tabs or components
    window.addEventListener("favoritesUpdated", loadFavorites);
    return () => window.removeEventListener("favoritesUpdated", loadFavorites);
  }, [mounted]);

  if (!mounted) {
    return (
      <div style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
        Loading favorites...
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ 
        fontSize: "2.5rem", 
        fontWeight: 800, 
        marginBottom: "2rem",
        color: "var(--text-main)" 
      }}>
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "5rem 1rem",
          color: "var(--text-muted)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem"
        }}>
          <div style={{ fontSize: "4rem" }}>🍿</div>
          <div>
            <p style={{ fontSize: "1.25rem", color: "var(--text-main)", marginBottom: "0.5rem", fontWeight: 600 }}>
              Your favorites list is empty.
            </p>
            <p style={{ fontSize: "0.95rem" }}>
              Start exploring and save some movies you love!
            </p>
          </div>
          <Link 
            href="/"
            style={{
              padding: "0.75rem 1.5rem",
              background: "var(--accent)",
              color: "#000",
              fontWeight: 700,
              borderRadius: "8px",
              textDecoration: "none",
              display: "inline-block",
              marginTop: "1rem"
            }}
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "1.5rem",
        }}>
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
