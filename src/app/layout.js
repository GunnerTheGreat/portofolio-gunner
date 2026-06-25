import { Geist, Geist_Mono, Quicksand, Rubik_Spray_Paint, Cinzel, UnifrakturMaguntia, Potta_One, Outfit, Electrolize } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const rubikSpray = Rubik_Spray_Paint({
  variable: "--font-rubik-spray",
  subsets: ["latin"],
  weight: "400",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const unifraktur = UnifrakturMaguntia({
  variable: "--font-unifraktur",
  subsets: ["latin"],
  weight: "400",
});

const pottaOne = Potta_One({
  variable: "--font-potta-one",
  subsets: ["latin"],
  weight: "400",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const electrolize = Electrolize({
  variable: "--font-electrolize",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "GUNNER | PORTFOLIO",

  description: "Daniel Angelou Alorro's Official Portfolio",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="goth" suppressHydrationWarning className="overflow-x-clip w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} ${rubikSpray.variable} ${cinzel.variable} ${unifraktur.variable} ${pottaOne.variable} ${outfit.variable} ${electrolize.variable} antialiased overflow-x-clip w-full`}
      >
        {children}
      </body>
    </html>
  );
}
