import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/search-bar"
import NotificationDropdown from "@/components/notification-dropdown"
import { Quicksand } from "next/font/google"

const quicksand = Quicksand({ subsets: ["latin"] })

export default function Header({ showSearch = true }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-gradient-nav backdrop-blur-xl shadow-periwinkle-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <Image
              src="/images/murmur-logo.png"
              alt="Murmur Logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain transition-transform group-hover:scale-110"
              priority
            />
          </div>
          <span className={`${quicksand.className} text-xl font-bold tracking-tight text-primary transition-colors group-hover:text-accent`}>
            murmur
          </span>
        </Link>

        {showSearch && (
          <div className="flex-1 mx-8 max-w-2xl">
            <SearchBar />
          </div>
        )}

        <div className="flex items-center space-x-3">
          <NotificationDropdown />
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-105">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-semibold text-sm shadow-md hover:shadow-lg transition-shadow">
                AM
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
