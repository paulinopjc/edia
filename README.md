# Admin Dashboard with Rasa Integration and Location-Based Clinics Map

This project is a modern **Admin Dashboard** built with **Next.js**, **NextAuth**, and **MUI**, featuring:

- 🧑‍💼 **User Authentication** (Register & Login)
- 🤖 **Rasa NLU Integration** for chatbot/AI interactions
- 📍 **Nearby Clinics Finder** using **Google Maps API**
- 🔒 **Session Management** via NextAuth
- 🗺️ **Responsive Design** with Material UI (MUI)

---

## ✨ Features

### ✅ Authentication
- Secure registration and login with session support via `next-auth`
- Role-based access supported (Admin, User)

### 💬 Chatbot Integration
- Connects to a **Rasa** server (via REST webhook)
- Sends user queries and displays bot replies
- Configured using `RASA_NLU_SERVER` environment variable

### 📌 Clinics Near You
- Uses the **Google Maps Places API** and **Geolocation API**
- Detects user's current location
- Displays clinics near the user on an interactive map

---

## 🛠️ Technologies Used

- **Next.js** (App Router)
- **TypeScript**
- **Material UI (MUI)**
- **NextAuth.js** for auth
- **Rasa NLU** for AI/chatbot
- **Google Maps API**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
