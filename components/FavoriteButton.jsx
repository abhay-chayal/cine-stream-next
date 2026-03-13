"use client"

import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function FavoriteButton({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const favorites = JSON.parse(localStorage.getItem("cinestream_favorites") || "[]");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFavorite(favorites.some(fav => fav.imdbID === movie.imdbID));
  }, [movie.imdbID, mounted]);

  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem("cinestream_favorites") || "[]");
    
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
      localStorage.setItem("cinestream_favorites", JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem("cinestream_favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
    
    // Dispatch custom event so other components can react if needed
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  // Prevent hydration mismatch by returning null until mounted on client
  if (!mounted) return null;

  return (
    <button
      onClick={toggleFavorite}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "50%",
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 10,
        transition: "all 0.2s ease",
        color: isFavorite ? "#ff3b3b" : "white",
        outline: "none",
      }}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.background = "rgba(0, 0, 0, 0.8)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.background = "rgba(0, 0, 0, 0.6)";
      }}
    >
      {isFavorite ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
    </button>
  );
}
