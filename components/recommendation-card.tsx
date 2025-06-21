"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  MapPin,
  ThumbsUp,
  Heart,
  Share2,
  MessageCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Navigation,
  ShoppingCart,
  Calendar,
  Bookmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import AudioPlayer from "@/components/audio-player"
import LocationDistance from "@/components/location-distance"
import CommentDialog from "@/components/comment-dialog"
import ShareDialog from "@/components/share-dialog"
import ImageCarousel from "@/components/image-carousel"
import { useSavedMurmurs } from "@/contexts/saved-murmurs-context"

interface User {
  name: string
  avatar: string
  trustScore?: number
}

interface ActionButton {
  type: "reservation" | "directions" | "purchase" | "website"
  label: string
  url?: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

interface Recommendation {
  id: string
  user: User
  text: string
  location?: string | null
  coordinates?: {
    latitude: number
    longitude: number
  }
  category: string
  sentiment: "Positive" | "Negative" | "Neutral"
  image?: string
  images?: string[]
  audio: string
  reactions: {
    thumbsUp?: number
    heart?: number
    thumbsDown?: number
  }
  verified?: boolean
  verificationTypes?: string[]
  actionButton?: ActionButton
}

interface RecommendationCardProps {
  recommendation: Recommendation
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const { isSaved, saveMurmur, unsaveMurmur } = useSavedMurmurs()
  const [isExpanded, setIsExpanded] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Determine if text should be truncated
  const shouldTruncate = recommendation.text.length > 150
  const truncatedText =
    shouldTruncate && !isExpanded ? `${recommendation.text.substring(0, 150)}...` : recommendation.text

  // Get trust score color
  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-blue-500"
    if (score >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Handle action button click
  const handleActionClick = () => {
    if (!recommendation.actionButton) return

    const { type, url, coordinates } = recommendation.actionButton

    if (type === "directions" && coordinates) {
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.latitude},${coordinates.longitude}`
      window.open(mapsUrl, "_blank")
    } else if (url) {
      window.open(url, "_blank")
    }
  }

  // Get action button icon
  const getActionIcon = (type: string) => {
    switch (type) {
      case "reservation":
        return <Calendar className="h-4 w-4" />
      case "directions":
        return <Navigation className="h-4 w-4" />
      case "purchase":
        return <ShoppingCart className="h-4 w-4" />
      case "website":
        return <ExternalLink className="h-4 w-4" />
      default:
        return <ExternalLink className="h-4 w-4" />
    }
  }

  // Determine which images to show
  const imagesToShow =
    recommendation.images && recommendation.images.length > 0
      ? recommendation.images
      : recommendation.image
        ? [recommendation.image]
        : []

  return (
    <Card className="overflow-hidden hover-lift transition-smooth shadow-periwinkle-sm hover:shadow-periwinkle-md animate-fade-in group">
      {imagesToShow.length > 0 && (
        <div className="relative overflow-hidden">
          <ImageCarousel images={imagesToShow} alt={`Images for ${recommendation.text.substring(0, 20)}...`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={recommendation.user.avatar || "/placeholder.svg"}
                  alt={recommendation.user.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-md"
                />
                {recommendation.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-success-500 rounded-full p-1">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold text-foreground font-poppins">{recommendation.user.name}</h3>
                  {recommendation.user.trustScore && (
                    <div
                      className={cn(
                        "flex items-center justify-center px-2 py-1 rounded-full text-white text-xs font-bold shadow-sm",
                        getTrustScoreColor(recommendation.user.trustScore),
                      )}
                    >
                      {recommendation.user.trustScore}
                    </div>
                  )}
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span>2 days ago</span>
                  {recommendation.verificationTypes && recommendation.verificationTypes.length > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <div className="flex items-center space-x-1">
                        {recommendation.verificationTypes.map((type, index) => (
                          <span key={index} className="text-accent text-xs font-medium">
                            {type}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-full hover:bg-muted transition-colors"
                onClick={() =>
                  isSaved(recommendation.id) ? unsaveMurmur(recommendation.id) : saveMurmur(recommendation.id)
                }
              >
                <Bookmark
                  className={`h-4 w-4 transition-colors ${isSaved(recommendation.id) ? "fill-accent text-accent" : "text-muted-foreground hover:text-accent"}`}
                />
              </Button>
              <div
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium shadow-sm",
                  recommendation.sentiment === "Positive"
                    ? "bg-success-50 text-success-600 border border-success-100"
                    : recommendation.sentiment === "Negative"
                      ? "bg-destructive/10 text-destructive border border-destructive/20"
                      : "bg-muted text-muted-foreground border border-border",
                )}
              >
                {recommendation.category}
              </div>
            </div>
          </div>

          {/* Enhanced Audio player */}
          <div className="mt-6 p-4 bg-gradient-to-r from-surface-white to-muted/30 rounded-xl border border-border/50">
            <AudioPlayer
              audioUrl={recommendation.audio}
              waveformHeight={44}
              showVolumeControl={true}
              showDuration={true}
            />

            {/* Enhanced Action button */}
            {recommendation.actionButton && (
              <div className="flex justify-center mt-4">
                <Button
                  onClick={handleActionClick}
                  variant="gradient"
                  size="sm"
                  className="px-6 py-2 font-medium"
                >
                  {getActionIcon(recommendation.actionButton.type)}
                  <span className="ml-2">{recommendation.actionButton.label}</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced expandable transcription */}
        <div className="mb-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-sm leading-relaxed text-foreground/80 font-inter">{truncatedText}</p>
          </div>

          {shouldTruncate && (
            <div className="flex justify-center mt-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 rounded-full text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Read more
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {recommendation.location && (
          <div className="mb-4 p-4 rounded-xl bg-gradient-card border border-border/50 shadow-inner">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <MapPin className="h-4 w-4 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{recommendation.location}</p>
                {recommendation.coordinates && (
                  <LocationDistance
                    latitude={recommendation.coordinates.latitude}
                    longitude={recommendation.coordinates.longitude}
                    className="mt-1 text-muted-foreground"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between bg-muted/20 border-t border-border/50 p-4">
        <div className="flex space-x-2">
          <Button variant="soft" size="sm" className="space-x-2">
            <ThumbsUp className="h-4 w-4" />
            <span className="font-medium">{recommendation.reactions.thumbsUp || 0}</span>
          </Button>
          <Button variant="soft" size="sm" className="space-x-2">
            <Heart className="h-4 w-4 text-red-500" />
            <span className="font-medium">{recommendation.reactions.heart || 0}</span>
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="space-x-2" onClick={() => setShowComments(true)}>
            <MessageCircle className="h-4 w-4" />
            <span>Comment</span>
          </Button>
          <Button variant="outline" size="sm" className="space-x-2" onClick={() => setShowShare(true)}>
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </CardFooter>

      <CommentDialog
        open={showComments}
        onOpenChange={setShowComments}
        murmurId={recommendation.id}
        murmurText={recommendation.text}
        murmurUser={recommendation.user}
      />

      <ShareDialog
        open={showShare}
        onOpenChange={setShowShare}
        murmurId={recommendation.id}
        murmurText={recommendation.text}
      />
    </Card>
  )
}
