import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: {
    default: "Cine-Stream",
    template: "%s | Cine-Stream",
  },
  description: "Discover and explore movies with Cine-Stream — powered by OMDB.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
