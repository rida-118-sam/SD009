"use client"

import { useState } from "react"
import "./MediaModal.css"

const MediaModal = ({ media, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
    return views.toString()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="media-container">
          {media.type === "photo" && (
            <div className="photo-container">
              <img src={media.url || "https://via.placeholder.com/800x600"} alt={media.title} className="modal-image" />
            </div>
          )}

          {(media.type === "reel" || media.type === "video") && (
            <div className="video-container">
              <img src={media.url || "https://via.placeholder.com/800x600"} alt={media.title} className="modal-video" />
              <div className="video-controls-overlay">
                <button className="play-pause-btn" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? "⏸" : "▶"}
                </button>
              </div>
              <div className="video-controls">
                <button className="control-btn" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? "🔇" : "🔊"}
                </button>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <button className="control-btn">⛶</button>
              </div>
            </div>
          )}
        </div>

        <div className="media-info">
          <h2 className="media-title">{media.title}</h2>
          <p className="media-description">{media.description}</p>

          <div className="media-meta">
            <div className="creator-info">
              <span className="creator">@{media.creator}</span>
              <span className="time">{media.createdAt}</span>
            </div>
            <div className="stats">
              {media.views && <span className="views">{formatViews(media.views)} views</span>}
              <div className="likes">
                <span className="heart-icon">♥</span>
                <span>{media.likes}</span>
              </div>
            </div>
          </div>

          <div className="media-tags">
            {media.tags.map((tag) => (
              <span key={tag} className="badge">
                #{tag}
              </span>
            ))}
          </div>

          <div className="action-buttons">
            <button className="btn btn-primary">
              <span className="heart-icon">♥</span>
              Like
            </button>
            <button className="btn btn-secondary">
              <span className="bookmark-icon">🔖</span>
              Save
            </button>
            <button className="btn btn-secondary">
              <span className="share-icon">↗</span>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaModal
