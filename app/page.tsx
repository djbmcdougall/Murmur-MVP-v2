"use client"

import Header from "@/components/header"
import RecommendationCard from "@/components/recommendation-card"
import { Button } from "@/components/ui/button"
import CategoryIcon from "@/components/category-icon"
import CreateMurmurButton from "@/components/create-murmur-button"
import { useState, useEffect } from "react"
import RecommendationSkeleton from "@/components/recommendation-skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function HomePage() {
  // Mock data for recommendations with Sarah's multiple images
  const recommendations = [
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar: "/users/sarah-johnson.jpg",
        trustScore: 87,
      },
      text: "I absolutely loved the coffee at Brew & Bean! The atmosphere was cozy and the staff was super friendly. Definitely recommend their caramel latte! The pastries were also fresh and delicious. I spent a few hours working there and the WiFi was fast and reliable. The prices are reasonable for the quality you get. I'll definitely be coming back regularly.",
      location: "Brew & Bean Coffee Shop",
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
      category: "Food & Drink",
      sentiment: "Positive",
      emotion: "enthusiastic" as const,
      images: ["/recommendations/sarah-coffee-1.jpg", "/recommendations/sarah-coffee-2.jpg"],
      audio: "/audio/sarah-coffee-recommendation.json",
      reactions: {
        thumbsUp: 24,
        heart: 12,
      },
      verified: true,
      verificationTypes: ["voice", "purchase", "visit"] as const,
      actionButton: {
        type: "reservation" as const,
        label: "Reservation",
        url: "https://example.com/reservation",
      },
    },
    {
      id: "2",
      user: {
        name: "Mike Chen",
        avatar: "/users/mike-chen.jpg",
        trustScore: 73,
      },
      text: "The new hiking trail at Evergreen Park is absolutely stunning! Great views and well-maintained paths. Perfect for a weekend adventure. I went there last Saturday and was amazed by the natural beauty. The trail is about 5 miles long with moderate difficulty, so it's suitable for most hikers. There are several lookout points along the way with breathtaking views of the valley and mountains beyond. I'd recommend going early in the morning to avoid crowds and catch the beautiful morning light.",
      location: "Evergreen Park",
      coordinates: {
        latitude: 37.7694,
        longitude: -122.4862,
      },
      category: "Outdoors",
      sentiment: "Positive",
      emotion: "satisfied" as const,
      image: "/recommendations/hiking-trail.jpg",
      audio: "/audio/mike-hiking-recommendation.json",
      reactions: {
        thumbsUp: 18,
        heart: 9,
      },
      verified: true,
      verificationTypes: ["voice", "visit"] as const,
      actionButton: {
        type: "directions" as const,
        label: "Directions",
        coordinates: {
          latitude: 37.7694,
          longitude: -122.4862,
        },
      },
    },
    {
      id: "3",
      user: {
        name: "Emily Rodriguez",
        avatar: "/users/emily-rodriguez.jpg",
        trustScore: 92,
      },
      text: 'Just finished reading "The Midnight Library" and it was such a thought-provoking book. The character development was incredible! The story follows Nora Seed who finds herself in a library between life and death, with each book representing a different version of her life. It really makes you think about the choices we make and the ripple effects they have. The author does an amazing job of weaving philosophy into an engaging narrative. Highly recommend for anyone looking for a meaningful read.',
      location: null,
      category: "Books",
      sentiment: "Positive",
      emotion: "enthusiastic" as const,
      image: "/recommendations/midnight-library-book.jpg",
      audio: "/audio/emily-book-recommendation.json",
      reactions: {
        thumbsUp: 32,
        heart: 15,
      },
      verified: false,
      verificationTypes: ["voice"] as const,
      actionButton: {
        type: "purchase" as const,
        label: "Purchase",
        url: "https://example.com/book-purchase",
      },
    },
    {
      id: "4",
      user: {
        name: "David Kim",
        avatar: "/users/david-kim.jpg",
        trustScore: 45,
      },
      text: "The service at Tech Gadgets was disappointing. Waited for 30 minutes and the staff wasn't knowledgeable about the products. When I finally got help, the employee couldn't answer basic questions about the laptop specs and kept checking their phone. The store was also disorganized with items in the wrong places. I ended up leaving without making a purchase and found a much better experience at another store. Would not recommend if you're looking for informed tech advice.",
      location: "Tech Gadgets Store",
      coordinates: {
        latitude: 37.7831,
        longitude: -122.4039,
      },
      category: "Shopping",
      sentiment: "Negative",
      emotion: "disappointed" as const,
      image: "/recommendations/tech-gadgets-store.jpg",
      audio: "/placeholder.mp3",
      reactions: {
        thumbsDown: 8,
        thumbsUp: 2,
      },
      verified: true,
      verificationTypes: ["voice", "visit"] as const,
      actionButton: {
        type: "directions" as const,
        label: "Directions",
        coordinates: {
          latitude: 37.7831,
          longitude: -122.4039,
        },
      },
    },
  ]

  // Category filters
  const categories = [
    { id: "all", name: "All", type: "all" as const },
    { id: "food", name: "Food & Drink", type: "food" as const },
    { id: "travel", name: "Travel", type: "travel" as const },
  ]

  // Add loading state
  const [isLoading, setIsLoading] = useState(true)
  const [voiceOnly, setVoiceOnly] = useState(false)
  const [activeTab, setActiveTab] = useState("for-you")

  // Add useEffect to simulate loading
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter recommendations based on voice-only toggle
  const filteredRecommendations = voiceOnly
    ? recommendations.filter((rec) => rec.verificationTypes?.includes("voice"))
    : recommendations

  return (
    <div className="pb-20 min-h-screen bg-gradient-to-br from-surface-white to-background">
      <Header />
      <main id="main-content" className="container px-4 py-8" role="main" aria-label="Main content">
        <Tabs defaultValue="for-you" onValueChange={setActiveTab} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-white/80 backdrop-blur-sm border border-border/50 shadow-sm" role="tablist" aria-label="Recommendation feeds">
              <TabsTrigger 
                value="for-you" 
                className="data-[state=active]:bg-accent data-[state=active]:text-white"
                role="tab"
                aria-controls="for-you-panel"
              >
                For You
              </TabsTrigger>
              <TabsTrigger 
                value="trending" 
                className="data-[state=active]:bg-accent data-[state=active]:text-white"
                role="tab"
                aria-controls="trending-panel"
              >
                Trending
              </TabsTrigger>
              <TabsTrigger 
                value="verified" 
                className="data-[state=active]:bg-accent data-[state=active]:text-white"
                role="tab"
                aria-controls="verified-panel"
              >
                Voice Verified
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-sm">
              <Switch 
                id="voice-only" 
                checked={voiceOnly} 
                onCheckedChange={setVoiceOnly}
                className="data-[state=checked]:bg-accent"
                aria-describedby="voice-only-description"
              />
              <Label htmlFor="voice-only" className="flex items-center cursor-pointer">
                <Mic className="h-4 w-4 mr-2 text-accent" aria-hidden="true" />
                <span className="text-sm font-medium">Voice Only</span>
              </Label>
              <span id="voice-only-description" className="sr-only">
                Toggle to show only voice-verified recommendations
              </span>
            </div>
          </div>

          <TabsContent 
            value="for-you" 
            className="animate-fade-in"
            role="tabpanel"
            id="for-you-panel"
            aria-labelledby="for-you-heading"
          >
            <section aria-labelledby="for-you-heading">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 id="for-you-heading" className="text-3xl font-bold font-poppins text-gradient mb-2">
                    Recommended For You
                  </h2>
                  <p className="text-muted-foreground">Discover trusted recommendations from your community</p>
                </div>

                {/* Enhanced Categories */}
                <div className="flex space-x-3 overflow-x-auto pb-2 -mx-2 px-2" role="tablist" aria-label="Category filters">
                  {categories.map((category, index) => (
                    <Button
                      key={category.id}
                      variant="outline"
                      className="h-auto flex-col py-4 px-6 bg-white/90 backdrop-blur-sm min-w-[120px] hover-lift transition-smooth shadow-sm hover:shadow-md border-border/50 animate-fade-in"
                      role="tab"
                      aria-selected={category.id === "all"}
                      tabIndex={category.id === "all" ? 0 : -1}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      aria-label={`Filter by ${category.name}`}
                    >
                      {category.id === "all" ? (
                        <span className="text-base font-medium mb-1">All</span>
                      ) : (
                        <>
                          <CategoryIcon type={category.type} size={28} className="mb-2" aria-hidden="true" />
                          <span className="text-xs font-medium">{category.name}</span>
                        </>
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Enhanced Recommendations */}
              {isLoading ? (
                <div role="status" aria-label="Loading recommendations">
                  <span className="sr-only">Loading recommendations...</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                      <RecommendationSkeleton />
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                      <RecommendationSkeleton />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                      <RecommendationSkeleton />
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                      <RecommendationSkeleton />
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                      <RecommendationSkeleton />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {filteredRecommendations.slice(0, 2).map((recommendation, index) => (
                      <article 
                        key={recommendation.id} 
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <RecommendationCard recommendation={recommendation} />
                      </article>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredRecommendations.slice(2).map((recommendation, index) => (
                      <article 
                        key={recommendation.id} 
                        className="animate-fade-in"
                        style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                      >
                        <RecommendationCard recommendation={recommendation} />
                      </article>
                    ))}
                  </div>
                </>
              )}
            </section>
          </TabsContent>

          <TabsContent 
            value="trending" 
            className="animate-fade-in"
            role="tabpanel"
            id="trending-panel"
          >
            <div className="h-60 flex flex-col items-center justify-center text-muted-foreground bg-white/50 backdrop-blur-sm rounded-2xl border border-border/50">
              <div className="text-6xl mb-4" role="img" aria-label="Trending chart emoji">📈</div>
              <h3 className="text-xl font-semibold mb-2">Trending Soon</h3>
              <p className="text-center max-w-md">Discover what's popular in your area. This feature is coming soon!</p>
            </div>
          </TabsContent>

          <TabsContent 
            value="verified" 
            className="animate-fade-in"
            role="tabpanel"
            id="verified-panel"
            aria-labelledby="verified-heading"
          >
            <div className="mb-6 text-center">
              <h2 id="verified-heading" className="text-3xl font-bold font-poppins text-gradient mb-3">
                Voice Verified Recommendations
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Authentic recommendations verified by voice analysis and community trust
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations
                .filter((rec) => rec.verificationTypes?.includes("voice"))
                .map((recommendation, index) => (
                  <article 
                    key={recommendation.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <RecommendationCard recommendation={recommendation} />
                  </article>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <CreateMurmurButton />
    </div>
  )
}
