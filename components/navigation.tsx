"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Map, User, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Navigation() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  // Don't show navigation on welcome, login, and signup pages
  const hideNavigation = ["/welcome", "/login", "/signup"].includes(pathname)

  if (hideNavigation) {
    return null
  }

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      description: "View your feed",
    },
    {
      name: "Discover",
      href: "/discover",
      icon: Search,
      description: "Find new recommendations",
    },
    {
      name: "Map",
      href: "/map",
      icon: Map,
      description: "Explore geotagged murmurs",
    },
    {
      name: "Messages",
      href: "/messages",
      icon: MessageSquare,
      description: "Your conversations",
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      description: "View your profile",
    },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-card/95 backdrop-blur-xl shadow-periwinkle-lg"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around p-2">
        <TooltipProvider>
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 relative group",
                      isActive 
                        ? "text-accent bg-accent/10 scale-105" 
                        : "text-muted-foreground hover:text-accent hover:bg-accent/5",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <div className={cn(
                      "relative transition-transform duration-200",
                      isActive ? "scale-110" : "group-hover:scale-105"
                    )}>
                      <item.icon className="h-5 w-5" />
                      {isActive && (
                        <div className="absolute inset-0 animate-pulse">
                          <item.icon className="h-5 w-5 text-accent/30" />
                        </div>
                      )}
                    </div>
                    <span className={cn(
                      "text-xs mt-1.5 font-medium transition-all duration-200",
                      isActive ? "text-accent font-semibold" : "text-muted-foreground"
                    )}>
                      {item.name}
                    </span>
                    {isActive && (
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-bounce-gentle" />
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-primary text-primary-foreground border-none shadow-lg">
                  <p className="font-medium">{item.description}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </div>
    </nav>
  )
}
