import { getMovie } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Level 3: generateMetadata sets <title> and <meta description> dynamically per movie
export async function generateMetadata({ params }) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (!movie || movie.Response === "False") {
    return { title: "Movie Not Found" };
  }

  return {
    title: movie.Title,
    description: movie.Plot,
    openGraph: {
      title: movie.Title,
      description: movie.Plot,
      images: movie.Poster !== "N/A" ? [movie.Poster] : [],
    },
  };
}

export default async function MovieDetailPage({ params }) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (!movie || movie.Response === "False") {
    notFound();
  }

  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  const badges = [
    { label: "Year", value: movie.Year },
    { label: "Rated", value: movie.Rated },
    { label: "Runtime", value: movie.Runtime },
    { label: "Genre", value: movie.Genre },
  ].filter((b) => b.value && b.value !== "N/A");

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>

      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          color: "var(--accent)",
          fontWeight: 600,
          fontSize: "0.95rem",
          marginBottom: "2rem",
        }}
      >
        &#8592; Back to Movies
      </Link>

      <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", alignItems: "flex-start" }}>

        {/* Poster */}
        <div style={{
          flexShrink: 0,
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          border: "1px solid var(--border)",
          width: "280px",
          height: "415px",
          position: "relative",
          background: "var(--bg-card)",
        }}>
          {hasPoster ? (
            <Image
              src={movie.Poster}
              alt={movie.Title + " poster"}
              fill
              style={{ objectFit: "cover" }}
              sizes="280px"
              priority
            />
          ) : (
            <div style={{
              width: "100%", height: "100%", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: "4rem", color: "var(--text-muted)",
            }}>
              🎬
            </div>
          )}
        </div>

        {/* Details */}
        <div style={{ flex: 1, minWidth: "280px" }}>
          <h1 style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "0.75rem",
          }}>
            {movie.Title}
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {badges.map((b) => (
              <span key={b.label} style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                padding: "0.25rem 0.75rem",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
              }}>
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>{b.label}:</span>{" "}{b.value}
              </span>
            ))}
            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <span style={{
                background: "var(--accent)", color: "#000",
                borderRadius: "20px", padding: "0.25rem 0.75rem",
                fontSize: "0.8rem", fontWeight: 700,
              }}>
                &#11088; {movie.imdbRating} / 10
              </span>
            )}
          </div>

          {movie.Plot && movie.Plot !== "N/A" && (
            <p style={{
              fontSize: "1rem", lineHeight: 1.75,
              color: "var(--text-muted)", marginBottom: "1.5rem", maxWidth: "600px",
            }}>
              {movie.Plot}
            </p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { label: "Director", value: movie.Director },
              { label: "Writers",  value: movie.Writer },
              { label: "Stars",    value: movie.Actors },
              { label: "Language", value: movie.Language },
              { label: "Country",  value: movie.Country },
              { label: "Box Office", value: movie.BoxOffice },
              { label: "Awards",   value: movie.Awards },
            ]
              .filter((r) => r.value && r.value !== "N/A")
              .map((row) => (
                <div key={row.label} style={{ display: "flex", gap: "0.5rem" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 600, minWidth: "90px", fontSize: "0.9rem" }}>
                    {row.label}:
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    {row.value}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
