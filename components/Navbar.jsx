import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "rgba(13,13,15,0.85)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--border)",
      padding: "0.9rem 1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "1rem",
    }}>
      <Link href="/" style={{
        fontWeight: 800,
        fontSize: "1.3rem",
        letterSpacing: "-0.02em",
        color: "var(--text-main)",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        flexShrink: 0,
      }}>
        <span style={{ color: "var(--accent)" }}>🎬</span> Cine-Stream
      </Link>
      
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1, justifyContent: "flex-end" }}>
        <Link href="/favorites" style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          color: "var(--text-main)",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "0.95rem",
          padding: "0.4rem 0.8rem",
          borderRadius: "8px",
          transition: "background 0.2s",
        }}
        >
          <span style={{ color: "#ff3b3b" }}>♥</span> Favorites
        </Link>
        <SearchBar />
      </div>
    </header>
  );
}
