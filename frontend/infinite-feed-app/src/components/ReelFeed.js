"use client"
import "./ReelFeed.css"

const ReelFeed = ({ items, onItemClick }) => {
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="reel-feed">
      {items.map((item) => (
        <div key={item.id} className="reel-card" onClick={() => onItemClick(item)}>
          <div className="reel-container">
            <img src={item.url || "https://via.placeholder.com/300x600"} alt={item.title} className="reel-image" />

            <div className="reel-play-overlay">
              <button className="play-btn">▶</button>
            </div>

            <div className="reel-content">
              <div className="reel-info">
                <h3 className="reel-title">{item.title}</h3>
                <p className="reel-description">{item.description}</p>
                <div className="reel-meta">
                  <span className="creator">@{item.creator}</span>
                  <span className="time">{item.createdAt}</span>
                </div>
                <div className="reel-tags">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="badge">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="reel-actions">
                <button className="action-btn">
                  <span className="heart-icon">♥</span>
                </button>
                <span className="likes-count">{item.likes}</span>
                <button className="action-btn">
                  <span className="bookmark-icon">🔖</span>
                </button>
                <button className="action-btn">
                  <span className="share-icon">↗</span>
                </button>
              </div>
            </div>

            {item.duration && <div className="duration-badge">{formatDuration(item.duration)}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReelFeed
