"use client"

export const dynamic = 'force-dynamic'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, Settings, Users, Mail, Bell, Bookmark } from "lucide-react"
import ProfileActionMenu from "@/components/profile-action-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MapPin } from "lucide-react"
import RecommendationCard from "@/components/recommendation-card"
import { useAuth } from "@/contexts/auth-context"
import { useSavedMurmurs } from "@/contexts/saved-murmurs-context"

export default function ProfilePage() {
  const router = useRouter()
  const { user } = useAuth()
  const { savedMurmurs } = useSavedMurmurs()
  const [avatarError, setAvatarError] = useState(false)

  // Mock data for user profile
  const profile = {
    id: user?.id || "1",
    name: user?.name || "Alex Morgan",
    avatar: user?.avatar || "/users/alex-morgan.jpg",
    bio: "Food enthusiast | Travel lover | Always looking for the next great experience",
    location: "San Francisco, CA",
    countryFlag: user?.countryFlag || "🇺🇸",
    language: user?.language || "English",
    showCountryFlag: user?.preferences?.displaySettings?.showCountryFlag ?? true,
    stats: {
      recommendations: 42,
      listeners: 156,
      listening: 89,
    },
  }

  // Mock data for recommendations (reusing from homepage)
  const recommendations = [
    {
      id: "1",
      user: {
        name: profile.name,
        avatar: profile.avatar,
      },
      text: "I absolutely loved the coffee at Brew & Bean! The atmosphere was cozy and the staff was super friendly. Definitely recommend their caramel latte! The pastries were also fresh and delicious. I spent a few hours working there and the WiFi was fast and reliable. The prices are reasonable for the quality you get. I'll definitely be coming back regularly.",
      location: "Brew & Bean Coffee Shop",
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
      category: "Food & Drink",
      sentiment: "Positive",
      image: "/placeholder.svg?height=300&width=400&text=Coffee+Shop",
      audio: "/audio/alex-coffee-recommendation.json",
      reactions: {
        thumbsUp: 24,
        heart: 12,
      },
      verified: true,
    },
    {
      id: "2",
      user: {
        name: profile.name,
        avatar: profile.avatar,
      },
      text: "The new hiking trail at Evergreen Park is absolutely stunning! Great views and well-maintained paths. Perfect for a weekend adventure. I went there last Saturday and was amazed by the natural beauty. The trail is about 5 miles long with moderate difficulty, so it's suitable for most hikers. There are several lookout points along the way with breathtaking views of the valley and mountains beyond.",
      location: "Evergreen Park",
      coordinates: {
        latitude: 37.7694,
        longitude: -122.4862,
      },
      category: "Outdoors",
      sentiment: "Positive",
      image: "/placeholder.svg?height=300&width=400&text=Hiking+Trail",
      audio: "/audio/alex-hiking-recommendation.json",
      reactions: {
        thumbsUp: 18,
        heart: 9,
      },
      verified: true,
    },
  ]

  // Mock data for users Alex is listening to
  const listeningUsers = [
    {
      id: "sarah-1",
      name: "Sarah Johnson",
      avatar: "/users/sarah-johnson.jpg",
      bio: "Coffee enthusiast & local foodie",
      location: "San Francisco, CA",
      murmurCount: 23,
      listenerCount: 145,
      verified: true,
    },
    {
      id: "mike-2",
      name: "Mike Chen",
      avatar: "/users/mike-chen.jpg",
      bio: "Tech reviewer & gadget lover",
      location: "Palo Alto, CA",
      murmurCount: 18,
      listenerCount: 89,
      verified: false,
    },
    {
      id: "emily-3",
      name: "Emily Rodriguez",
      avatar: "/users/emily-rodriguez.jpg",
      bio: "Bookworm & literature enthusiast",
      location: "Berkeley, CA",
      murmurCount: 31,
      listenerCount: 203,
      verified: true,
    },
    {
      id: "david-4",
      name: "David Kim",
      avatar: "/users/david-kim.jpg",
      bio: "Outdoor adventurer & hiker",
      location: "Oakland, CA",
      murmurCount: 15,
      listenerCount: 67,
      verified: false,
    },
  ]

  const handleSettingsClick = () => {
    router.push("/settings")
  }

  const handleAvatarError = () => {
    setAvatarError(true)
  }

  return (
    <div className="pb-16">
      <div className="relative h-32 w-full bg-gradient-to-r from-primary/20 to-primary/40">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={handleSettingsClick}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <div className="container px-4">
        <div className="relative -mt-16 mb-6 flex flex-col items-center">
          <div className="relative">
            <div className="h-32 w-32 rounded-full border-4 border-background bg-muted overflow-hidden flex items-center justify-center">
              {!avatarError ? (
                <Image
                  src={profile.avatar || "/placeholder.svg"}
                  alt={profile.name}
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                  onError={handleAvatarError}
                />
              ) : (
                <span className="text-4xl font-bold">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              )}
            </div>
            {profile.showCountryFlag && profile.countryFlag && (
              <div className="absolute -right-2 bottom-3 h-8 w-8 rounded-full bg-background flex items-center justify-center text-xl">
                {profile.countryFlag}
              </div>
            )}
          </div>

          <h1 className="mt-4 text-2xl font-bold">{profile.name}</h1>

          <div className="mt-1 flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{profile.location}</span>
            {profile.showCountryFlag && profile.language && (
              <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">{profile.language}</span>
            )}
          </div>

          <p className="mt-2 text-center text-sm">{profile.bio}</p>

          <div className="mt-4 flex w-full justify-center space-x-6">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{profile.stats.recommendations}</span>
              <span className="text-xs text-muted-foreground">Murmurs</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{profile.stats.listeners}</span>
              <span className="text-xs text-muted-foreground">Listeners</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{profile.stats.listening}</span>
              <span className="text-xs text-muted-foreground">Listening</span>
            </div>
          </div>

          <div className="mt-6 flex w-full justify-center">
            <TooltipProvider>
              <div className="flex items-center space-x-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-white">
                      <Search className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Search</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-white">
                      <Mail className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Message</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-white">
                      <Bell className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>

                <ProfileActionMenu
                  userId={profile.id || "1"}
                  userName={profile.name}
                  isOwnProfile={profile.name === user?.name}
                />

                <Button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full">
                  <Users className="mr-2 h-5 w-5" />
                  Listen
                </Button>
              </div>
            </TooltipProvider>
          </div>
        </div>

        <Tabs defaultValue="murmurs" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="murmurs">Murmurs</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="listening">Listening</TabsTrigger>
          </TabsList>
          <TabsContent value="murmurs" className="mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {recommendations.map((recommendation) => (
                <RecommendationCard key={recommendation.id} recommendation={recommendation} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="saved" className="mt-6">
            {savedMurmurs.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {recommendations
                  .filter((rec) => savedMurmurs.includes(rec.id))
                  .map((recommendation) => (
                    <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                  ))}
              </div>
            ) : (
              <Card className="flex h-40 items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Bookmark className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
                  <p>No saved murmurs yet.</p>
                  <p className="text-sm">Save murmurs you want to revisit later!</p>
                </div>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="listening" className="mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {listeningUsers.map((user) => (
                <Card key={user.id} className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Image
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      {user.verified && (
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                        <Button variant="outline" size="sm" className="text-xs">
                          Listening
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{user.bio}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>{user.murmurCount} murmurs</span>
                        <span>{user.listenerCount} listeners</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
