"use client"

import { useState, useEffect, useCallback } from "react"
import Header from "./components/Header"
import PhotoFeed from "./components/PhotoFeed"
import ReelFeed from "./components/ReelFeed"
import VideoFeed from "./components/VideoFeed"
import MediaModal from "./components/MediaModal"
import { photoData, reelData, videoData } from "./data/dummyData"
import "./App.css"

function App() {
  const [activeTab, setActiveTab] = useState("photos")
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [photoItems, setPhotoItems] = useState(photoData)
  const [reelItems, setReelItems] = useState(reelData)
  const [videoItems, setVideoItems] = useState(videoData)
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

  return (
    <div className="App">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        <div className="container">
          {activeTab === "photos" && <PhotoFeed items={photoItems} onItemClick={setSelectedMedia} />}
          {activeTab === "reels" && <ReelFeed items={reelItems} onItemClick={setSelectedMedia} />}
          {activeTab === "videos" && <VideoFeed items={videoItems} onItemClick={setSelectedMedia} />}

          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          )}
        </div>
      </main>

      {selectedMedia && <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />}
    </div>
  )
}

export default App
