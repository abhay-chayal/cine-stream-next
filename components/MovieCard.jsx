import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";

export default function MovieCard({ movie }) {
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <Link
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
      }}>
        {hasPoster ? (
          <Image
            src={movie.Poster}
            alt={movie.Title + " poster"}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 50vw, 200px"
          />
        ) : (
            <div style={{
              width: "100%", height: "100%", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: "3rem",
            }}>
              🎬
            </div>
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
    </Link>
  );
}
