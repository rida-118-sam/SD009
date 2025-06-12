"use client"
import "./PhotoFeed.css"

const PhotoFeed = ({ items, onItemClick }) => {
  return (
    <div className="photo-feed">
      {items.map((item) => (
        <div key={item.id} className="photo-card" onClick={() => onItemClick(item)}>
          <div className="photo-container">
            <img src={item.url || "https://via.placeholder.com/300x400"} alt={item.title} className="photo-image" />
            <div className="photo-overlay">
              <div className="photo-stats">
                <div className="stat">
                  <span className="heart-icon">♥</span>
                  <span>{item.likes}</span>
                </div>
                <button className="more-btn">⋯</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PhotoFeed
