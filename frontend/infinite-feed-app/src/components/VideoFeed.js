"use client"
import "./VideoFeed.css"

const VideoFeed = ({ items, onItemClick }) => {
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
    <div className="video-feed">
      {items.map((item) => (
        <div key={item.id} className="video-card" onClick={() => onItemClick(item)}>
          <div className="video-thumbnail">
            <img
              src={item.thumbnail || item.url || "https://via.placeholder.com/350x200"}
              alt={item.title}
              className="thumbnail-image"
            />
            <div className="video-overlay">
              <button className="play-btn">▶</button>
            </div>
            {item.duration && <div className="duration-badge">{formatDuration(item.duration)}</div>}
          </div>

          <div className="video-info">
            <h3 className="video-title">{item.title}</h3>
            <p className="video-description">{item.description}</p>

            <div className="video-meta">
              <span className="creator">@{item.creator}</span>
              <span className="time">{item.createdAt}</span>
            </div>

            {item.views && (
              <div className="video-stats">
                <span className="views">{formatViews(item.views)} views</span>
                <div className="likes">
                  <span className="heart-icon">♥</span>
                  <span>{item.likes}</span>
                </div>
              </div>
            )}

            <div className="video-tags">
              {item.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="badge">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default VideoFeed
