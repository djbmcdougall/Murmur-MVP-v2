"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Mic, MapPin, TrendingUp, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export default function SearchBar({ className = "" }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSearch = (value: string) => {
    setOpen(false)
    router.push(`/search?q=${encodeURIComponent(value)}`)
  }

  const handleVoiceSearch = () => {
    // Placeholder for voice search functionality
    console.log("Voice search activated")
  }

  return (
    <>
      <div className={`relative ${className}`}>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
          <Input
            type="search"
            placeholder="Search recommendations, places, or people..."
            className="w-full rounded-2xl bg-white/90 backdrop-blur-sm border border-border/50 pl-11 pr-12 py-3 text-sm focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 shadow-sm focus:shadow-md"
            onClick={() => setOpen(true)}
            aria-label="Search recommendations"
            role="searchbox"
          />
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full hover:bg-accent/10 transition-colors"
            onClick={handleVoiceSearch}
            aria-label="Voice search"
          >
            <Mic className="h-4 w-4 text-muted-foreground hover:text-accent transition-colors" />
          </Button>
        </div>
        
        {/* Enhanced keyboard shortcut indicator */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden md:flex items-center space-x-1 text-xs text-muted-foreground pointer-events-none">
          <kbd className="px-2 py-1 bg-muted/50 rounded text-xs">⌘</kbd>
          <kbd className="px-2 py-1 bg-muted/50 rounded text-xs">K</kbd>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="border-none">
          <CommandInput
            placeholder="Search recommendations, places, or people..."
            value={query}
            onValueChange={setQuery}
            className="border-none focus:ring-0"
          />
        </div>
        <CommandList className="max-h-96">
          <CommandEmpty className="py-8 text-center">
            <div className="text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No results found for "{query}"</p>
              <p className="text-sm mt-1">Try searching for places, categories, or users</p>
            </div>
          </CommandEmpty>
          
          <CommandGroup heading="Recent Searches" className="px-2">
            <CommandItem 
              onSelect={() => handleSearch("coffee shop")}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent/10"
            >
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>coffee shop</span>
              <span className="text-xs text-muted-foreground ml-auto">Food & Drink</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => handleSearch("hiking trails")}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent/10"
            >
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>hiking trails</span>
              <span className="text-xs text-muted-foreground ml-auto">Outdoors</span>
            </CommandItem>
          </CommandGroup>
          
          <CommandGroup heading="Trending Near You" className="px-2">
            <CommandItem 
              onSelect={() => handleSearch("italian restaurant")}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent/10"
            >
              <TrendingUp className="h-4 w-4 text-accent" />
              <span>italian restaurant</span>
              <MapPin className="h-3 w-3 text-muted-foreground ml-auto" />
            </CommandItem>
            <CommandItem 
              onSelect={() => handleSearch("summer reads")}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent/10"
            >
              <TrendingUp className="h-4 w-4 text-accent" />
              <span>summer reads</span>
              <span className="text-xs text-muted-foreground ml-auto">Books</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => handleSearch("rooftop bars")}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent/10"
            >
              <TrendingUp className="h-4 w-4 text-accent" />
              <span>rooftop bars</span>
              <MapPin className="h-3 w-3 text-muted-foreground ml-auto" />
            </CommandItem>
          </CommandGroup>
          
          <CommandGroup heading="Categories" className="px-2">
            <CommandItem 
              onSelect={() => handleSearch("food & drink")}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent/10"
            >
              <div className="h-4 w-4 rounded bg-gradient-to-r from-orange-400 to-red-500"></div>
              <span>Food & Drink</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => handleSearch("travel")}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent/10"
            >
              <div className="h-4 w-4 rounded bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <span>Travel</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => handleSearch("books")}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent/10"
            >
              <div className="h-4 w-4 rounded bg-gradient-to-r from-green-400 to-blue-500"></div>
              <span>Books</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
