"use client"

import { useState, useEffect, useCallback } from "react"
import { Heart, Bookmark, Share, Play, Pause, Volume2, VolumeX, Maximize, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Dummy data
const photoData = [
  {
    id: 1,
    type: "photo",
    url: "/placeholder.svg?height=400&width=300",
    title: "Sunset Mountain View",
    description: "Beautiful sunset over the mountain range",
    tags: ["nature", "sunset", "mountains"],
    likes: 1234,
    creator: "NaturePhotographer",
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    type: "photo",
    url: "/placeholder.svg?height=500&width=300",
    title: "Urban Architecture",
    description: "Modern city skyline at night",
    tags: ["architecture", "city", "night"],
    likes: 856,
    creator: "CityExplorer",
    createdAt: "4 hours ago",
  },
  {
    id: 3,
    type: "photo",
    url: "/placeholder.svg?height=350&width=300",
    title: "Ocean Waves",
    description: "Peaceful ocean waves at dawn",
    tags: ["ocean", "waves", "peaceful"],
    likes: 2341,
    creator: "OceanLover",
    createdAt: "6 hours ago",
  },
  {
    id: 4,
    type: "photo",
    url: "/placeholder.svg?height=450&width=300",
    title: "Forest Path",
    description: "Mysterious forest trail in autumn",
    tags: ["forest", "autumn", "trail"],
    likes: 567,
    creator: "ForestWalker",
    createdAt: "8 hours ago",
  },
  {
    id: 5,
    type: "photo",
    url: "/placeholder.svg?height=400&width=300",
    title: "Desert Landscape",
    description: "Vast desert under starry sky",
    tags: ["desert", "stars", "landscape"],
    likes: 1789,
    creator: "DesertNomad",
    createdAt: "10 hours ago",
  },
  {
    id: 6,
    type: "photo",
    url: "/placeholder.svg?height=380&width=300",
    title: "City Rain",
    description: "Rainy evening in the city",
    tags: ["rain", "city", "evening"],
    likes: 923,
    creator: "RainChaser",
    createdAt: "12 hours ago",
  },
]

const reelData = [
  {
    id: 1,
    type: "reel",
    url: "/placeholder.svg?height=600&width=300",
    title: "Quick Recipe",
    description: "30-second pasta recipe",
    tags: ["cooking", "recipe", "quick"],
    likes: 5432,
    creator: "ChefMaster",
    duration: 30,
    createdAt: "1 hour ago",
  },
  {
    id: 2,
    type: "reel",
    url: "/placeholder.svg?height=600&width=300",
    title: "Dance Moves",
    description: "Learn this trending dance",
    tags: ["dance", "trending", "tutorial"],
    likes: 8765,
    creator: "DancePro",
    duration: 45,
    createdAt: "3 hours ago",
  },
  {
    id: 3,
    type: "reel",
    url: "/placeholder.svg?height=600&width=300",
    title: "Life Hack",
    description: "Amazing productivity tip",
    tags: ["lifehack", "productivity", "tips"],
    likes: 3421,
    creator: "LifeHacker",
    duration: 25,
    createdAt: "5 hours ago",
  },
  {
    id: 4,
    type: "reel",
    url: "/placeholder.svg?height=600&width=300",
    title: "Pet Tricks",
    description: "Teaching my dog new tricks",
    tags: ["pets", "dogs", "tricks"],
    likes: 6789,
    creator: "PetTrainer",
    duration: 40,
    createdAt: "7 hours ago",
  },
]

const videoData = [
  {
    id: 1,
    type: "video",
    url: "/placeholder.svg?height=200&width=350",
    thumbnail: "/placeholder.svg?height=200&width=350",
    title: "Complete React Tutorial for Beginners",
    description:
      "Learn React from scratch with this comprehensive tutorial covering all the basics and advanced concepts.",
    tags: ["react", "tutorial", "programming"],
    likes: 12543,
    creator: "CodeMaster",
    duration: 480,
    views: 45632,
    createdAt: "2 days ago",
  },
  {
    id: 2,
    type: "video",
    url: "/placeholder.svg?height=200&width=350",
    thumbnail: "/placeholder.svg?height=200&width=350",
    title: "Travel Vlog: Exploring Japan",
    description: "Join me on an incredible journey through Japan, visiting Tokyo, Kyoto, and hidden gems.",
    tags: ["travel", "japan", "vlog"],
    likes: 8934,
    creator: "TravelBuddy",
    duration: 720,
    views: 23451,
    createdAt: "3 days ago",
  },
  {
    id: 3,
    type: "video",
    url: "/placeholder.svg?height=200&width=350",
    thumbnail: "/placeholder.svg?height=200&width=350",
    title: "Cooking Masterclass: Italian Cuisine",
    description: "Learn to cook authentic Italian dishes with professional chef techniques and family recipes.",
    tags: ["cooking", "italian", "masterclass"],
    likes: 15678,
    creator: "ChefItalia",
    duration: 600,
    views: 67890,
    createdAt: "1 week ago",
  },
  {
    id: 4,
    type: "video",
    url: "/placeholder.svg?height=200&width=350",
    thumbnail: "/placeholder.svg?height=200&width=350",
    title: "Fitness Transformation Journey",
    description: "My complete fitness transformation over 6 months with workout routines and diet tips.",
    tags: ["fitness", "transformation", "health"],
    likes: 9876,
    creator: "FitLife",
    duration: 420,
    views: 34567,
    createdAt: "5 days ago",
  },
]

type MediaItem = {
  id: number
  type: "photo" | "reel" | "video"
  url: string
  thumbnail?: string
  title: string
  description: string
  tags: string[]
  likes: number
  creator: string
  duration?: number
  views?: number
  createdAt: string
}

export default function InfiniteFeedApp() {
  const [activeTab, setActiveTab] = useState<"photos" | "reels" | "videos">("photos")
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [photoItems, setPhotoItems] = useState<MediaItem[]>(photoData)
  const [reelItems, setReelItems] = useState<MediaItem[]>(reelData)
  const [videoItems, setVideoItems] = useState<MediaItem[]>(videoData)
  const [loading, setLoading] = useState(false)

  // Infinite scroll logic
  const loadMoreItems = useCallback(() => {
    if (loading) return

    setLoading(true)
    setTimeout(() => {
      if (activeTab === "photos") {
        setPhotoItems((prev) => [...prev, ...photoData.map((item) => ({ ...item, id: item.id + prev.length }))])
      } else if (activeTab === "reels") {
        setReelItems((prev) => [...prev, ...reelData.map((item) => ({ ...item, id: item.id + prev.length }))])
      } else {
        setVideoItems((prev) => [...prev, ...videoData.map((item) => ({ ...item, id: item.id + prev.length }))])
      }
      setLoading(false)
    }, 1000)
  }, [activeTab, loading])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
      loadMoreItems()
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loadMoreItems])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
    return views.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">FeedApp</h1>
            <nav className="flex space-x-1">
              <Button
                variant={activeTab === "photos" ? "default" : "ghost"}
                onClick={() => setActiveTab("photos")}
                className="text-sm"
              >
                Photos
              </Button>
              <Button
                variant={activeTab === "reels" ? "default" : "ghost"}
                onClick={() => setActiveTab("reels")}
                className="text-sm"
              >
                Reels
              </Button>
              <Button
                variant={activeTab === "videos" ? "default" : "ghost"}
                onClick={() => setActiveTab("videos")}
                className="text-sm"
              >
                Videos
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === "photos" && <PhotoFeed items={photoItems} onItemClick={setSelectedMedia} />}
        {activeTab === "reels" && <ReelFeed items={reelItems} onItemClick={setSelectedMedia} />}
        {activeTab === "videos" && <VideoFeed items={videoItems} onItemClick={setSelectedMedia} />}

        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </main>

      {/* Media Modal */}
      {selectedMedia && <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />}
    </div>
  )
}

function PhotoFeed({ items, onItemClick }: { items: MediaItem[]; onItemClick: (item: MediaItem) => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
      {items.map((item) => (
        <Card
          key={item.id}
          className="group cursor-pointer overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
          onClick={() => onItemClick(item)}
        >
          <div className="relative aspect-square">
            <img
              src={item.url || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-between text-white text-sm">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>{item.likes}</span>
                </div>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function ReelFeed({ items, onItemClick }: { items: MediaItem[]; onItemClick: (item: MediaItem) => void }) {
  return (
    <div className="max-w-md mx-auto space-y-4">
      {items.map((item) => (
        <Card
          key={item.id}
          className="relative overflow-hidden border-0 shadow-lg cursor-pointer group"
          onClick={() => onItemClick(item)}
        >
          <div className="relative aspect-[9/16] bg-black">
            <img src={item.url || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="lg" variant="ghost" className="text-white bg-black/30 hover:bg-black/50 rounded-full">
                <Play className="w-8 h-8 fill-white" />
              </Button>
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-end justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{item.title}</h3>
                  <p className="text-sm text-white/80 truncate">{item.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm">@{item.creator}</span>
                    <span className="text-sm">{item.createdAt}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-white/20 text-white border-0">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-4 ml-4">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 rounded-full">
                    <Heart className="w-6 h-6" />
                  </Button>
                  <span className="text-sm">{item.likes}</span>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 rounded-full">
                    <Bookmark className="w-6 h-6" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 rounded-full">
                    <Share className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Duration indicator */}
            {item.duration && (
              <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {formatDuration(item.duration)}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}

function VideoFeed({ items, onItemClick }: { items: MediaItem[]; onItemClick: (item: MediaItem) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card
          key={item.id}
          className="group cursor-pointer overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
          onClick={() => onItemClick(item)}
        >
          <div className="relative aspect-video">
            <img
              src={item.thumbnail || item.url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="lg" variant="ghost" className="text-white bg-black/30 hover:bg-black/50 rounded-full">
                <Play className="w-8 h-8 fill-white" />
              </Button>
            </div>
            {item.duration && (
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {formatDuration(item.duration)}
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg line-clamp-2 mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>@{item.creator}</span>
              <span>{item.createdAt}</span>
            </div>
            {item.views && (
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="text-muted-foreground">{formatViews(item.views)} views</span>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{item.likes}</span>
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-1 mt-3">
              {item.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function MediaModal({ media, onClose }: { media: MediaItem; onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="relative max-w-4xl w-full max-h-[90vh] bg-background rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70"
          onClick={onClose}
        >
          ✕
        </Button>

        {media.type === "photo" && (
          <div className="relative">
            <img
              src={media.url || "/placeholder.svg"}
              alt={media.title}
              className="w-full max-h-[70vh] object-contain"
            />
          </div>
        )}

        {(media.type === "reel" || media.type === "video") && (
          <div className="relative bg-black">
            <img
              src={media.url || "/placeholder.svg"}
              alt={media.title}
              className="w-full max-h-[70vh] object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                variant="ghost"
                className="text-white bg-black/50 hover:bg-black/70 rounded-full"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-12 h-12" /> : <Play className="w-12 h-12 fill-white" />}
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-4">
              <Button
                size="sm"
                variant="ghost"
                className="text-white bg-black/50 hover:bg-black/70"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <div className="flex-1 bg-white/30 h-1 rounded-full">
                <div className="bg-white h-1 rounded-full w-1/3"></div>
              </div>
              <Button size="sm" variant="ghost" className="text-white bg-black/50 hover:bg-black/70">
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{media.title}</h2>
          <p className="text-muted-foreground mb-4">{media.description}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className="font-semibold">@{media.creator}</span>
              <span className="text-sm text-muted-foreground">{media.createdAt}</span>
            </div>
            <div className="flex items-center space-x-4">
              {media.views && <span className="text-sm text-muted-foreground">{formatViews(media.views)} views</span>}
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{media.likes}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {media.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center space-x-2 mt-6">
            <Button className="flex-1">
              <Heart className="w-4 h-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" className="flex-1">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" className="flex-1">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

function formatViews(views: number) {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
  return views.toString()
}
