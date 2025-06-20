"use client"

import { useState } from "react"
import { Mic, Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function CreateMurmurButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleClick = () => {
    setIsLoading(true)

    // Show a loading toast
    toast({
      title: "Opening recorder...",
      description: "Preparing to capture your voice recommendation",
    })

    // Navigate to the record page
    setTimeout(() => {
      router.push("/record")
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="fixed bottom-24 right-6 md:right-8 z-40">
      <Button
        onClick={handleClick}
        size="lg"
        className="relative rounded-full shadow-periwinkle-lg hover:shadow-periwinkle-xl h-16 w-16 md:h-18 md:w-18 p-0 bg-gradient-to-r from-accent-blue to-accent-lavender hover:from-accent-blue/90 hover:to-accent-lavender/90 text-white transition-all duration-300 hover:scale-110 active:scale-95 group"
        disabled={isLoading}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue/20 to-accent-lavender/20 animate-pulse" />
        <div className="relative z-10">
          {isLoading ? (
            <Loader2 className="h-7 w-7 animate-spin" />
          ) : (
            <div className="relative">
              <Mic className="h-7 w-7 transition-transform group-hover:scale-110" />
              <div className="absolute -top-1 -right-1">
                <Plus className="h-3 w-3 bg-white text-accent rounded-full p-0.5" />
              </div>
            </div>
          )}
        </div>
        <span className="sr-only">Create new murmur</span>
        
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
        <div className="absolute inset-0 rounded-full border border-white/20" />
      </Button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 px-3 py-1 bg-primary text-primary-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        Create Murmur
        <div className="absolute top-full right-4 w-2 h-2 bg-primary rotate-45 transform -translate-y-1" />
      </div>
    </div>
  )
}
