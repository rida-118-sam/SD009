# 📱 infiScroll – Infinite Feed Recommendation Web App

**infiScroll** is a sleek, scroll-based content recommendation app designed to deliver an endless stream of personalized posts — including **Photos**. With smart onboarding, dynamic themes, and an intuitive UI, it's built for users who crave simplicity without sacrificing discovery.

🔗 **Live Demo**: [Try it on Vercel](https://infiscroll-zeta.vercel.app/login)

---

# 📖 Table of Contents

- [🎯 Objective](#objective)
- [✨ Key Features](#key-features)
- [🖼️ Screenshots](#screenshots)
- [🧠 Tech Stack](#tech-stack)
- [🛠️ How to Run Locally](#how-to-run-locally)
- [📂 Folder Structure](#folder-structure)
- [🧪 Challenges Faced](#challenges-faced)
- [📊 Analytics & Engagement Tracking](#analytics--engagement-tracking)
- [👥 Team](#team)
- [🚀 Project Submission](#project-submission)

---

<div id="objective"></div>
## 🎯 Objective

> To solve content fatigue by offering a recommendation-driven, clean, and infinite scroll experience tailored to individual interests — all in one beautiful UI.

---

<div id="key-features"></div>
# ✨ Key Features

- ♾️ **Infinite Feed** – Seamlessly loads more posts as you scroll.
- 🔍 **Smart Recommendations** – Posts based on selected interests (coming in final version).
- 🧠 **Category Tabs** – Filter content across: `Photos`.
- ❤️ **User Interaction** – Like, Save, Skip, and View Later functionality.
- 📱 **Onboarding & Preferences** – Personalized category selection during login.
- 🌗 **Theme Toggle** – Switch between **Light** and **Dark** mode.
- 📶 **Responsive Design** – Optimized for both desktop and mobile.

---

<div id="screenshots"></div>

# 🖼️ Screenshots

<table>
  <tr>
    <td align="center" valign="top">
      <b>Login Page</b><br/>
      <img src="https://github.com/user/screenshots/raw/main/Screenshot%202025-08-01%20210118.png" style="width:220px; height:auto; max-height:400px; object-fit:cover; border-radius:8px;"/>
    </td>
    <td align="center" valign="top">
      <b>Explore Feed - Light Mode</b><br/>
      <img src="https://github.com/user/screenshots/raw/main/Screenshot%202025-08-01%20210137.png" style="width:220px; height:auto; max-height:400px; object-fit:cover; border-radius:8px;"/>
    </td>
    <td align="center" valign="top">
      <b>Explore Feed - Dark Mode</b><br/>
      <img src="https://github.com/user/screenshots/raw/main/Screenshot%202025-08-01%20210155.png" style="width:220px; height:auto; max-height:400px; object-fit:cover; border-radius:8px;"/>
    </td>
  </tr>
  <tr>
    <td align="center" valign="top">
      <b>Explore Tab View</b><br/>
      <img src="https://github.com/user/screenshots/raw/main/Screenshot%202025-08-01%20210212.png" style="width:220px; height:auto; max-height:400px; object-fit:cover; border-radius:8px;"/>
    </td>
    <td align="center" valign="top">
      <b>Recommended Sports Feed</b><br/>
      <img src="https://github.com/user/screenshots/raw/main/Screenshot%202025-08-01%20210240.png" style="width:220px; height:auto; max-height:400px; object-fit:cover; border-radius:8px;"/>
    </td>
    <td align="center" valign="top">
      <b>Category Filter Feed</b><br/>
      <img src="https://github.com/user/screenshots/raw/main/Screenshot%202025-08-01%20210254.png" style="width:220px; height:auto; max-height:400px; object-fit:cover; border-radius:8px;"/>
    </td>
  </tr>
  <tr>
    <td align="center" valign="top">
      <b>Single Post View</b><br/>
      <img src="https://github.com/user/screenshots/raw/main/Screenshot%202025-08-01%20210313.png" style="width:220px; height:auto; max-height:400px; object-fit:cover; border-radius:8px;"/>
    </td>
    <td align="center" valign="top">
      <b>Explore Bottom Nav</b><br/>
      <img src="https://github.com/user/screenshots/raw/main/Screenshot%202025-08-01%20210339.png" style="width:220px; height:auto; max-height:400px; object-fit:cover; border-radius:8px;"/>
    </td>
  </tr>
</table>


---

<div id="tech-stack"></div>
## 🧠 Tech Stack

| Layer          | Technologies              |
|----------------|---------------------------|
| Frontend       | React.js, Tailwind CSS    |
| Backend        | Node.js, Express.js       |
| Database       | Firebase Firestore        |
| Auth           | Firebase Google Sign-In   |
| Deployment     | Vercel (Frontend),        |

---

<div id="how-to-run-locally"></div>
## 🛠️ How to Run Locally

# 1. Install Dependencies
```bash
npm install

## 🛠️ How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

# 2. Configure Firebase

Add your Firebase config to a `.env` file:

```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
```

# 3. Start the App
```bash
npm start
```

---
<div id= "folder-structure"></div>
# 📂 Folder Structure

```bash
infiScroll/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── hooks/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── README.md
```

---

<div id= "challenges-faced"></div>
 🧪 Challenges Faced

- Integrating Firebase Auth with persistent state  
- Conditional theme rendering across components  
- Designing mobile-first responsive cards  
- Managing scroll-based content rendering  
- Syncing "Liked" & "Saved" states with Firebase  

---
<div id= "team"></div>
 👥 Team

| Name         | Role        |
|--------------|-------------|
| Aayush Bhaiya| Mentor      |
| Suhani       | Team Leader |
| Krisha       | Developer   |
| Rida         | Developer   |
| Shambhavi    | Developer   |

---
<div id= "analytics--engagement-tracking"></div>
## 📊 Analytics & Engagement Tracking

We use **Firebase Analytics** and **custom event logging** to better understand user behavior and continuously improve the platform.

# 🎯 Tracked Events

| Event Name         | Trigger Location     | Description                                   |
|--------------------|----------------------|-----------------------------------------------|
| `onboard_complete` | Onboarding Page      | User completed initial setup                  |
| `content_view`     | Explore Feed         | User viewed a content card                    |
| `like_post`        | Post Card            | User liked a specific post                    |
| `save_post`        | Post Card            | User saved a post to favorites                |
| `upload_content`   | Upload Page          | User uploaded their own media                 |
| `scroll_depth`     | Explore Page         | Measures how deep the user scrolls            |
| `toggle_theme`     | Settings Page        | User toggled between Light/Dark mode          |

# 📈 Insights

- We use this data to:
  - Prioritize popular categories (e.g., SPORTS, TECH)
  - Monitor active user sessions per day
  - Track how much content users actually scroll through
  - Optimize which uploads get promoted first

> 🔐 All analytics are anonymized and comply with Firebase's data privacy standards.


<div id= "project-submission"></div>
# 🚀 Project Submission

> Built with ❤️ by **Team SD_009** for **IITI Summer of Code 2025**
