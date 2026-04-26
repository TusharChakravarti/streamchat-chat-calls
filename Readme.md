# ⚡ StreamChat — Real-Time Chat & Video Calling

A production-ready full-stack application for real-time messaging, HD video calls, and language exchange. Built with a modern tech stack and shipped with enterprise-grade features.

---

## 🌐 Live Demo

👉 [streamchat-chat-calls.vercel.app](https://streamchat-chat-calls.vercel.app)

---

## ✨ Features

- 🔐 **Authentication** — Email/password signup with email verification (Resend), Google OAuth, forgot/reset password, JWT cookie sessions
- 📄 **Onboarding Flow** — Native language, learning language, location, bio setup for new users
- 💬 **Real-Time Chat** — Instant messaging powered by Stream.io with emoji reactions, file sharing, and typing indicators
- 📹 **HD Video Calls** — One-click video calling directly in the browser — no downloads required
- 👥 **Friend System** — Send/accept/reject friend requests with real-time notifications
- 🟢 **Live Online Status** — Real-time presence powered by Socket.io with instant updates across all devices
- 🌍 **Language Exchange** — Smart matching with native speakers of your target language
- 🔔 **Notifications** — Friend request alerts and activity updates
- 🛡️ **Protected Routes** — Secure navigation with auth guards throughout the app
- 📱 **Fully Responsive** — Mobile-first design that works on all screen sizes

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React | UI framework |
| TanStack Query | Server state management & caching |
| Tailwind CSS | Utility-first styling |
| Stream Chat React | Chat UI components |
| Socket.io Client | Real-time online presence |
| React Router | Client-side routing |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT + Cookies | Authentication sessions |
| Passport.js | Google OAuth strategy |
| Socket.io | Real-time WebSocket server |
| Resend | Transactional email delivery |
| Stream.io | Chat & video infrastructure |
| Bcryptjs | Password hashing |

---

## 📸 Pages & Screenshots

### 🏠 Landing Page
Public-facing marketing page with animated hero, live product demo, feature showcase, FAQ, and CTA sections.

### 🔐 Auth Pages
- **Sign Up** — Email/password registration with email verification flow + Google OAuth
- **Sign In** — Login with email/password or Google. Shows resend verification prompt if unverified
- **Verify Email** — Handles the email verification token from link
- **Forgot Password** — Request a password reset link via email
- **Reset Password** — Set a new password using the token from email

### 📋 Onboarding
New users set up their profile — full name, native language, learning language, location, bio, and profile picture.

### 🏡 Dashboard (Home)
- Online friends banner with real-time status
- Friends grid with online/offline dots
- Meet New Learners section with Add Friend / Request Sent cards
- Search bar to filter friends

### 💬 Chat Page
Full messaging interface powered by Stream Chat with dark theme, purple accents, video call button, emoji reactions, file uploads, and message history.

### 📹 Video Call Page
In-browser HD video calling with camera/mic controls. Call link automatically sent to chat when a call is started.

### 🔔 Notifications Page
Incoming friend requests with accept/reject actions.

---

## 🗂️ Project Structure

```
root/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Axios instance, API calls, utilities
│   │   ├── pages/           # All page components
│   │   └── constants/       # Language flags, static data
│   └── public/
└── backend/
    ├── controllers/         # Route handler logic
    ├── models/              # Mongoose schemas
    ├── routes/              # Express route definitions
    ├── middleware/           # Auth middleware
    └── lib/                 # DB, socket, passport, email, stream
```

---
---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/streamchat.git
cd streamchat
```

### 2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Set up environment variables
Copy `.env.example` to `.env` in both `backend/` and `frontend/` and fill in your values.

### 4. Run locally
```bash
# Backend (from /backend)
npm run dev

# Frontend (from /frontend)
npm run dev
```

---

## 🌍 Deployment

- **Frontend** — Vercel
- **Backend** — Render
- **Database** — MongoDB Atlas
- **Email** — Resend
- **Chat & Video** — Stream.io

---

## 📌 Custom Hooks

| Hook | Purpose |
|---|---|
| `useAuthUser` | Get current authenticated user |
| `useLogin` | Handle login mutation |
| `useSignUp` | Handle signup mutation |
| `useLogout` | Handle logout mutation |
| `useOnlineUsers` | Real-time online presence via Socket.io |

---

## 🔒 Security

- Passwords hashed with bcryptjs (salt rounds: 10)
- JWT stored in httpOnly cookies (not localStorage)
- Email verification required before login
- Google OAuth users auto-verified
- CORS configured for specific origins only
- Rate limiting on auth endpoints (recommended)

---

## 📄 License

MIT License — feel free to use this project for learning or as a base for your own applications.

---

Built with ❤️ for language learners everywhere.
