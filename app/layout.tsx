import type React from "react"
import { Inter, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import Navigation from "@/components/navigation"
import { SavedMurmursProvider } from "@/contexts/saved-murmurs-context"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata = {
  title: "Murmur - Voice-First Recommendations",
  description: "Discover and share trusted recommendations through voice",
  generator: "v0.dev",
  keywords: ["voice recommendations", "local reviews", "social platform", "audio reviews"],
  authors: [{ name: "Murmur Team" }],
  creator: "Murmur",
  publisher: "Murmur",
  robots: "index, follow",
  openGraph: {
    title: "Murmur - Voice-First Recommendations",
    description: "Discover and share trusted recommendations through voice",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Murmur - Voice-First Recommendations",
    description: "Discover and share trusted recommendations through voice",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <meta name="theme-color" content="#7B91C9" />
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background font-inter antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <SavedMurmursProvider>
              <div className="flex min-h-screen flex-col">
                <main className="flex-1" role="main">
                  {children}
                </main>
                <Navigation />
              </div>
              <Toaster />
              {/* Accessibility: Skip to main content link */}
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Skip to main content
              </a>
            </SavedMurmursProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
