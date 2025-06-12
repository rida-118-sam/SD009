"use client"
import "./Header.css"

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="logo">FeedApp</h1>
          <nav className="nav">
            <button
              className={`nav-btn ${activeTab === "photos" ? "active" : ""}`}
              onClick={() => setActiveTab("photos")}
            >
              Photos
            </button>
            <button
              className={`nav-btn ${activeTab === "reels" ? "active" : ""}`}
              onClick={() => setActiveTab("reels")}
            >
              Reels
            </button>
            <button
              className={`nav-btn ${activeTab === "videos" ? "active" : ""}`}
              onClick={() => setActiveTab("videos")}
            >
              Videos
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
